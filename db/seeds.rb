# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
1.times do |i|
  User.create(
    
   username: "Frank"

  
  )
  10.times do |j|
    ForumThread.create(
      title: ["Which Courses should i S/U?", "Where to go For SEP?", "Which degree is right for me?","Which hall to choose?"].sample,
      body: ["I have been considering these few choices but i have no idea, perhaps you could enlighten me?", "I have done much research but have yet to come to a conclusion, Please help me"].sample,
    category:["Question","Discussion","Off-Advice","Others"].sample,
    author: "Frank",
    user_id: 1
    )
    
  end
  10.times do |j|
    ForumThreadComment.create(
      
      body: ["Google is your best friend", "Read the FAQ", "Ask your seniors", "Ask your friends"].sample,
      author: "Frank",
    forum_thread_id: Random.rand(10)+1,
    user_id: 1
    
    )
  end
end

1.times do |i|
  User.create(
    
   username: "dean"

  
  )
  10.times do |j|
    ForumThread.create(
      title: ["Which Courses should i S/U?", "Where to go For SEP?", "Which degree is right for me?","Which hall to choose?"].sample,
      body: ["I have been considering these few choices but i have no idea, perhaps you could enlighten me?", "I have done much research but have yet to come to a conclusion, Please help me"].sample,
    category:["Question","Discussion","Off-Advice","Others"].sample,
    author: "dean",
    user_id: 2
    )
    
  end
  10.times do |j|
    ForumThreadComment.create(
      
      body: ["Google is your best friend", "Read the FAQ", "Ask your seniors", "Ask your friends"].sample,
      author: "dean",
    forum_thread_id: Random.rand(10)+1,
    user_id: 2
    
    )
  end
end
