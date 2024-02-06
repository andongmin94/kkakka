pipeline {
    agent any

    environment {
        BuildGradle     = credentials('build.gradle')
        // AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    }
    stages {
        stage('Clone') {
            steps {
                echo '클론을 시작!'
                git branch: 'cicdtest', credentialsId: 'docker-hub', url: 'https://lab.ssafy.com/s10-webmobile2-sub2/S10P12D110.git'
                echo '클론을 완료!'
            }
        }  
      
        stage('BE-Build') {
            steps {
                echo '백엔드 빌드 및 테스트 시작!'
                dir("./backend") {
                    sh "chmod +x ./gradlew"

                    // sh "touch ./build.gradle" 
 
                    // application properties 파일 복사
                    // sh "echo $BuildGradle > ./build.gradle"
            
                    sh "./gradlew clean build"
                
                }
                echo '백엔드 빌드 및 테스트 완료!'
            }
        } 
  
        stage('Build Docker Image') {
            steps {
                echo '도커 이미지 빌드 시작!'
                dir("./backend") {
                    // 빌드된 JAR 파일을 Docker 이미지로 빌드
                    sh "docker build -t osy9536/ssafy:latest ."
                }
                echo '도커 이미지 빌드 완료!'
            }
        }
 
        stage('Push to Docker Hub') {
            steps {
                echo '도커 이미지를 Docker Hub에 푸시 시작!'
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                }
                dir("./backend") {
                    sh "docker push osy9536/ssafy:latest"
                }
                echo '도커 이미지를 Docker Hub에 푸시 완료!'
            }
        }

        stage('Deploy to EC2') {
            steps {
                echo 'EC2에 배포 시작!'
                // 여기에서는 SSH 플러그인이나 SSH 스크립트를 사용하여 EC2로 연결하고 Docker 컨테이너 실행
                sshagent(['aws-key']) { 
                    sh "docker rm -f backend"
                    sh "docker rmi osy9536/ssafy:latest"
                    sh "docker pull osy9536/ssafy:latest && docker run -d -p 8080:8080 --name backend osy9536/ssafy:latest"
                }
                echo 'EC2에 배포 완료!'
            }
        }
    }

    post {
        success {
            echo '파이프라인이 성공적으로 완료되었습니다!'
        }
        failure {
            echo '파이프라인이 실패하였습니다. 에러를 확인하세요.'
        }
    }
}
