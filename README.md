# kartaca-task

Görevde istenen tüm özellikler sağlanmıştır, REST API Node.js'te Express.js framework'ü kullanılarak,  database ise MongoDB ile geliştirilmiştir.\
Zookeeper ve Kafka serverları açılmıştır ve kafka_2 topic'i üzerinden veri akışı sağlanmıştır.
Kafka klasörü içerisinde producer.js ve consumer.js fonksiyonlarını içeren dosyalar bulunmaktadır.
Producer app.js içerisinde üretilen veriyi yakalayıp topic'e gönderirken, consumer da veriyi yakalayarak MongoDB'ye yazmaktadır.\
Veri aynı zamanda bir endpoint üzerinden client-side'a gönderilip, gerçek zamanlı grafiği çizilmiştir.
Görev içeriğine ulaşmak için kullanılan script secret-message klasörü altındadır.

## Kullanım

Kullanım için makinede, docker ve docker-compose kurulu olmalıdır. Aşağıdaki kod üzerinden ana dizinde tek komutla proje ayağa kaldırılabilir.

` > docker-compose up -d`

Daha sonrasında, bir tarayıcıyla `localhost:3000` adresinden gerçek zamanlı grafiğe erişilebilir.\
Endpointlere buradaki butonlarla canlı olarak istek gönderilebilir.

##### Üçüncü parti uygulamalarla istek göndermek için endpointler:

**GET**  `> http://localhost:3000/get`\
**POST** `> http://localhost:3000/post`\
**PUT** `> http://localhost:3000/put`\
**DELETE** `> http://localhost:3000/delete` şeklindedir.

##### Anahtar Kodu
>gAAAAABgUIFEgtNQ9WQYqzRdnweS6W-IC_gQSrUKPnTlhtG4qilybSh6MFQcYPv8E4ChlR3iayFWUR8cx80c8iem9oE1fHuD7ds4wfIr4j8rX8FBLEPpy4DPRjFThKd8nDR8KW5aRw58GnZyeKl2BZHr-e2Fx0kXLZyDJybOUgZdZHtjvpezJUShFHKHjn4RAEJmdXonLRTj