package org.ssafy.ssafy_common2._common.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    // S3를 등록한 사람이 전달받은 접속하기 위한 key 값
    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    // S3를 등록한 사람이 전달받은 접속하기 위한 secret key 값
    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    // S3를 등록한 사람이 S3를 사용할 지역
    @Value("${cloud.aws.region.static}")
    private String region;

    // 전달받은 Accesskey 와 SecretKey 로 아마존 서비스 실행 준비
    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }
}