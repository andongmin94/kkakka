pipeline {
    agent any

    environment {
        BuildGradle     = credentials('build.gradle')
        Mat_Endpoint    = credentials('CICD_mat_endpoint')
        // AWS_SECRET_ACCESS_KEY = credentials('jenkins-aws-secret-access-key')
    }
    stages {
        stage('MM-Alarm'){
            steps{
                script {
                    def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                    def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                    mattermostSend (
                        color: '#D0E0E3', 
                        icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
                        message: "파이프라인 시작: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)"
                    )
                }
            }
        } 
  

        stage('Clone') { 
            steps {
                echo '클론을 시작!'
                git branch: 'dev', credentialsId: 'docker-hub', url: 'https://lab.ssafy.com/s10-webmobile2-sub2/S10P12D110.git'
                echo '클론을 완료!'
            }
        }  
      
        stage('Build and Deploy') {
            steps {
                echo '도커 컴포즈를 사용하여 서비스 빌드 및 배포 시작!'
                // 백엔드 서비스 빌드
                dir("./backend") {
                    sh "chmod +x ./gradlew"
                    sh "./gradlew clean build --exclude-task test"
                }

                // 프론트엔드 서비스 빌드
                dir("./frontend") {
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Deploy BE') {
            steps {
                echo '백엔드 배포 시작!'
                sshagent(['aws-key']) { 
                    sh "docker rm -f backend"
                    sh "docker rmi osy9536/ssafy-be:latest"
                    sh "docker image prune -f"
                    sh "docker docker run -d -p 8080:8080 --name backend osy9536/ssafy-be:latest"
                }
                echo '백엔드 배포 완료!'
            }
        }
        
        stage('Deploy FE') {
            steps {
                echo '프론트 배포 시작!'
                sshagent(['aws-key']) { 
                    sh "docker rm -f frontend"
                    sh "docker rmi osy9536/ssafy-fe:latest"
                    sh "docker image prune -f"
                    sh "docker build -t osy9536/ssafy-fe:latest ."
                    sh "docker run -d -p 3000:3000 --name frontend osy9536/ssafy-fe:latest"
                }
                echo '프론트 배포 완료!'
            }
        }

    }

    post {
        success {
            echo '파이프라인이 성공적으로 완료되었습니다!'
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (
                    color: '#D0E0E3', 
                    icon: "https://jenkins.io/images/logos/jenkins/jenkins.png",
                    message: "빌드 성공: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)"
                )
            }
        }
        failure {
            echo '파이프라인이 실패하였습니다. 에러를 확인하세요.'
            script {
                def Author_ID = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
                def Author_Name = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
                mattermostSend (
                    color: '#D0E0E3', 
                    icon: "https://4.bp.blogspot.com/-52EtGjEhW-k/UtOBXa1fhVI/AAAAAAAABbU/Lk4ZBYcvZrY/s1600/download.jpeg",
                    message: "빌드 실패: ${env.JOB_NAME} #${env.BUILD_NUMBER} by ${Author_ID}(${Author_Name})\n(<${env.BUILD_URL}|Details>)"
                )
            }
        }
    }
}
