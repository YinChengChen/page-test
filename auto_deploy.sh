nvm use v16.20.0
cd /webRoot/earth_data/test/page-test
npm install
# npm run build
docker build -t test-server-image:v1 .
# cd /webRoot/earth_data/test/page-test/build
# docker build -t test-server-image:v1 .
docker ps -qf ancestor=test-server-image:v1 > ip.log
container_id=$(cat ip.log)
echo $container_id
docker stop $container_id
docker run -d -p 5555:80 test-server-image:v1
