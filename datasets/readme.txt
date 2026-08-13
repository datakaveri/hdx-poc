# Curl command to retrieve maharashtra datasets (Paginated)
```
curl 'https://mahaagx.maharashtra.gov.in/controlplane/iudx/v2/cat/search?sort=itemCreatedAt%3Adesc%3B&page=2&size=6' \
  -X POST \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:152.0) Gecko/20100101 Firefox/152.0' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://mahaagx.maharashtra.gov.in' \
  -H 'Connection: keep-alive' \
  -H 'Referer: https://mahaagx.maharashtra.gov.in/datasets' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'Sec-GPC: 1' \
  -H 'Priority: u=0' \
  -H 'TE: trailers' \
  --data-raw '{"searchCriteria":[{"searchType":"term","field":"type","values":["adex:DataBank"]}]}'
```


# URL to retrieve geospatial datasets
```
https://dx.geospatial.org.in/dx/cat/v1/list/resourceGroup
Use relationship API to retrieve children
https://dx.geospatial.org.in/dx/cat/v1/relationship?id=5fc60dff-b038-48d7-8941-d114aec471d9&rel=resource
```


# URL to retrieve Urban Datasets
https://cos.iudx.org.in/iudx/cat/v1/list/resourceGroup
Use relationship API to retrieve children
https://cos.iudx.org.in/iudx/cat/v1/relationship?id=5fc60dff-b038-48d7-8941-d114aec471d9&rel=resource

# URL to retrieve telangana Datasets (Paginated)

curl 'https://controlplane.tgdex.telangana.gov.in/iudx/v2/cat/search?page=2&size=10' \
  -X POST \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:152.0) Gecko/20100101 Firefox/152.0' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://tgdex.telangana.gov.in' \
  -H 'Connection: keep-alive' \
  -H 'Referer: https://tgdex.telangana.gov.in/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-GPC: 1' \
  -H 'Priority: u=0' \
  -H 'TE: trailers' \
  --data-raw '{"searchCriteria":[{"searchType":"term","field":"type","values":["adex:DataBank"]}]}'

