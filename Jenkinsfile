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
                    // 停止並移除舊容器
                    sh '''
                        docker stop staging-app || true
                        docker rm staging-app || true
                    '''
                    
                    // 啟動新容器
                    sh '''
                        docker run -d \
                        --name staging-app \
                        -p 8081:3000 \
                        staging-app:latest
                    '''
                    
                    // 等待容器啟動
                    sh 'sleep 5'
                    
                    // Debug資訊
                    sh '''
                        echo "=== Container Status ==="
                        docker ps -a | grep staging-app
                        
                        echo ""
                        echo "=== Container Logs ==="
                        docker logs staging-app
                        
                        echo ""
                        echo "=== Container Port Mapping ==="
                        docker port staging-app
                        
                        echo ""
                        echo "=== Test from inside container ==="
                        docker exec staging-app wget -O- http://localhost:3000/health 2>&1 || echo "Internal test failed"
                        
                        echo ""
                        echo "=== List files in container ==="
                        docker exec staging-app ls -la
                        
                        echo ""
                        echo "=== Check process in container ==="
                        docker exec staging-app ps aux
                        
                        echo ""
                        echo "=== Test from host ==="
                        curl -v http://localhost:8081/health 2>&1 || echo "Host test failed"
                    '''
                    
                    // 實際的健康檢查
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
            echo 'Application is running at http://localhost:8081'
        }
        failure {
            echo 'Pipeline failed!'
            // 顯示失敗容器的詳細資訊
            sh '''
                echo "=== Final Container Status ==="
                docker ps -a | grep staging-app || echo "No container found"
                
                echo ""
                echo "=== Final Container Logs ==="
                docker logs staging-app 2>&1 || echo "Cannot get logs"
            '''
            // 清理失敗的容器
            sh '''
                docker stop staging-app || true
                docker rm staging-app || true
            '''
        }
        always {
            echo 'Pipeline execution completed'
        }
    }
}
