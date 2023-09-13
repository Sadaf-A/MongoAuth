pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                tool name: 'NodeJS', type: 'NodeJSInstallation'
                sh 'npm install'
            }
        }

        stage('Build and Run') {
            steps {
                sh 'node index.js'
            }
        }
    }

    post {
        success {
            echo 'Build and run successful!'
        }
    }
}
