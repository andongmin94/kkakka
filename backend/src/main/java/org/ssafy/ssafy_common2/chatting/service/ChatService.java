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
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
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
        try {
            // 1-1) ","를 기준으로 Base64를 나눠준다.
            String [] strings = chatMessageDto.getImgCode().split(",");
            String base64Image = strings[1];

            // 1-2) if 문을 통해 확장자명을 찾음
            String extension = "";

            if(strings[0].equals("data:image/jpeg;base64")){
                extension = "jpeg";
            } else if(strings[0].equals("data:image/png;base64")){
                extension = "png";
            } else if(strings[0].equals("data:image/jpg;base64")){
                extension = "jpg";
            } else if(strings[0].equals("data:image/gif;base64")){
                extension = "gif";
            }

            // 1-3) Base64를 bytes 로 변환
            byte [] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);

            // 1-4) create Temp File 을 통해 임시 파일을 생성해준다. (이 임시 파일은 지워줘야함.)
            File tempFile = File.createTempFile("image", "." + extension);

            try(OutputStream outputStream = new FileOutputStream(tempFile)){
                // 1-5) tempFile 에 이미지 바이트 배열을 써준다.
               outputStream.write(imageBytes);
            }

            // 1-6) UUID를 통해 파일명이 겹치지 않게 해준다.
            String originalName = UUID.randomUUID().toString();

            // 1-7) S3에 tempFile에 저장해준다.
            amazonS3Client.putObject(new PutObjectRequest(S3Bucket, originalName, tempFile));

            String awsS3ImageUrl = amazonS3Client.getUrl(S3Bucket, originalName).toString();

            try {
                // 1-8) 방금 생성한 임시 파일을 지우기
                FileOutputStream fileOutputStream = new FileOutputStream(tempFile);

                // 1-9) 아웃풋 닫아주기
                fileOutputStream.close();

                if(tempFile.delete()){
                    log.info("File delete success");
                }else{
                    log.info("File delete fail");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            chatMessageDto.setImgCode(awsS3ImageUrl);
            chatMessageDto.setContent("사진을 보냈습니다.");

            return chatMessageDto;

        } catch (IOException e) {
           throw new RuntimeException(e);
        }
    }

    @Transactional
    public String searchEnforcement(String chatOwnerEmail, String attenderEmail) {
        return enforcementRepository.findTopByDefenderAndAttackerOrderByCreatedAtDesc(chatOwnerEmail, attenderEmail).orElse(null);
    };











}

