cd /webRoot/earth_data/test/page-test
# docker ps | grep test-server-image:v1 > ip.log
# read -s name < ip.log
# echo $name

npm run build
docker ps -qf ancestor=test-server-image:v1 > ip.log
container_id=$(cat ip.log)
echo $container_id
docker stop $container_id
docker build -t test-server-image:v1 .
# cd /webRoot/earth_data/test/page-test/build
# docker build -t test-server-image:v1 .
docker run -d -p 5555:80 test-server-image:v1
