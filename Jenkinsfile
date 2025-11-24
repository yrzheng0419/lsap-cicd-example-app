pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-24-LTS'
    }
    
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t staging-app:latest .'
                }
            }
        }
        
        stage('Deploy and Verify') {
            steps {
                script {
                    sh '''
                        docker stop staging-app || true
                        docker rm staging-app || true
                    '''
                    
                    sh '''
                        docker run -d \
                        --name staging-app \
                        -p 8081:3000 \
                        staging-app:latest
                    '''
                    
                    sh 'sleep 5'
                    
                    sh '''
                        curl -f http://localhost:8081/health || exit 1
                        echo "Health check passed!"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
            sh '''
                docker stop staging-app || true
                docker rm staging-app || true
            '''
        }
    }
}
