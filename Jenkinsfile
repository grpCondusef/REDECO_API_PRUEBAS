/*
pipeline {
    agent any

    stages {

        stage('Deploy') {
            steps {
                script {
                    // Desplegar la aplicación
                    sh 'docker compose down'
                    sh 'docker compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'El pipeline se ejecutó exitosamente. Puedes considerar acciones adicionales aquí.'
        }

        failure {
            echo 'El pipeline falló. Puedes considerar acciones adicionales aquí.'
        }
    }
}
*/

pipeline {
    agent any

    environment {
        SERVICE_NAME = 'REDECO_API'
    }

    stages {
        stage('Monitor and Restart') {
            steps {
                script {
                    def isServiceUp = bat(script: 'curl -s -o NUL -w "%{http_code}" http://localhost:8080/redeco/quejas', returnStatus: true) == 200

                    if (!isServiceUp) {
                        echo 'Servicio no disponible. Reiniciando...'
                        sh 'npm run dev'
                    } else {
                        echo 'Servicio activo.'
                    }
                }
            }
        }
    }
}
