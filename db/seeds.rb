# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
9.times do |i|
    BlogPost.create(
      title: "title #{i + 1}",
      body: 'hi, bonjour, hola, ciao, hallo, namaste, salaam, zdras-tvuy-te, ohayo, marhaba, ni hao, shalom, goddag, ahoj, annyeong, bom dia, sveiki, merhaba, selamat pagi, selamat siang, selamat sore, selamat malam, selamat petang, selamat tidur, selamat beristirahat, selamat jalan, selamat datang, selamat tinggal, selamat makan, selamat bersenang-senang, selamat bersantai, selamat berlibur, selamat berjuang, selamat bekerja, selamat beraktivitas, selamat berolahraga, selamat bermain, selamat berpesta, selamat berpesta pora, selamat berpesta kembang api, selamat berpesta minum-minuman keras, selamat berpesta narkoba, selamat berpesta seks bebas, selamat berpesta seks bebas tanpa kondom, selamat berpesta seks bebas tanpa kondom dan KB, selamat berpesta seks bebas tanpa kondom, KB, dan suntik HIV, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, dan kematian, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, dan neraka, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, neraka, dan siksaan, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, neraka, siksaan, dan kekal, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, neraka, siksaan, kekal, dan keabadian, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, neraka, siksaan, kekal, keabadian, dan kekal abadian, selamat berpesta seks bebas tanpa kondom, KB, suntik HIV, kematian, neraka, siksaan, kekal, keabadian',
    
    )
  end