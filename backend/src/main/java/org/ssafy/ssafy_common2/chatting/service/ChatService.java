package org.ssafy.ssafy_common2.chatting.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.ssafy.ssafy_common2.chatting.dto.request.ChatMessageDto;
import org.ssafy.ssafy_common2.itemshop.repository.EnforcementRepository;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.util.Base64;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {


    private final AmazonS3Client amazonS3Client;
    private final EnforcementRepository enforcementRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket;

    // Base64 이미지 코드를 순수 파일로 변환
    @Transactional
    public ChatMessageDto BinaryImageChange(ChatMessageDto chatMessageDto) {
        File tempFile = null;
        try {
            String [] strings = chatMessageDto.getImgCode().split(",", 2);
            if (strings.length != 2) {
                throw new IllegalArgumentException("Invalid image data URI");
            }
            String base64Image = strings[1];

            String extension = switch (strings[0]) {
                case "data:image/jpeg;base64" -> "jpeg";
                case "data:image/png;base64" -> "png";
                case "data:image/jpg;base64" -> "jpg";
                case "data:image/gif;base64" -> "gif";
                default -> throw new IllegalArgumentException("Unsupported image type");
            };

            byte [] imageBytes = Base64.getDecoder().decode(base64Image);
            tempFile = File.createTempFile("image", "." + extension);

            try(OutputStream outputStream = Files.newOutputStream(tempFile.toPath())){
               outputStream.write(imageBytes);
            }

            String originalName = UUID.randomUUID() + "." + extension;
            amazonS3Client.putObject(new PutObjectRequest(S3Bucket, originalName, tempFile));

            String awsS3ImageUrl = amazonS3Client.getUrl(S3Bucket, originalName).toString();

            chatMessageDto.setImgCode(awsS3ImageUrl);
            chatMessageDto.setContent("사진을 보냈습니다.");

            return chatMessageDto;
        } catch (IOException e) {
            throw new IllegalStateException("Failed to process chat image", e);
        } finally {
            if (tempFile != null) {
                try {
                    Files.deleteIfExists(tempFile.toPath());
                } catch (IOException e) {
                    log.warn("Failed to delete temporary chat image");
                }
            }
        }
    }

    @Transactional
    public String searchEnforcement(String chatOwnerEmail, String attenderEmail) {
        return enforcementRepository.findTopByDefenderAndAttackerOrderByCreatedAtDesc(chatOwnerEmail, attenderEmail).orElse(null);
    };











}

