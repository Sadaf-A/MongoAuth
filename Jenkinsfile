pipeline {
    agent {
        docker {
            image 'node:14' 
            args '-u node' 
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
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
