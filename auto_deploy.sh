cd /webRoot/earth_data/test/page-test
npm run build
wait
# docker ps -qf ancestor=test-server-image:v1 > ip.log
# container_id=$(cat ip.log)
# echo $container_id
docker build -t test-server-image:v1 .
# docker stop $container_id
docker run -d -p 5555:80 test-server-image:v1
