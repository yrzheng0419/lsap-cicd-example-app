pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-24-LTS'  // 使用你剛才設定的NodeJS名稱
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
    }
}
