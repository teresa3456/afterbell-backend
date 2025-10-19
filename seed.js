// seed.js - Script to populate MongoDB with lesson data
const { MongoClient } = require('mongodb');
require('dotenv').config();

const lessons = [
   {
                  id: 1,
                  subject: "Mathematics",
                  location: "Room 101, Main Building",
                  price: 450.00,
                  spaces: 5,
                  icon: "fas fa-calculator"
               },
               {
                  id: 2,
                  subject: "Literature",
                  location: "Room 205, Arts Wing",
                  price: 500.00,
                  spaces: 5,
                  icon: "fas fa-book-open"
               },
               {
                  id: 3,
                  subject: "Biology",
                  location: "Lab BGO4, Science Block",
                  price: 500.00,
                  spaces: 5,
                  icon: "fas fa-microscope"
               },
               {
                  id: 4,
                  subject: "Chemistry",
                  location: "Lab BG03, Science Block",
                  price: 520.00,
                  spaces: 0,
                  icon: "fas fa-flask"
               },
               {
                  id: 5,
                  subject: "History",
                  location: "Room 108, Main Building",
                  price: 690.00,
                  spaces: 5,
                  icon: "fas fa-landmark"
               },
               {
                  id: 6,
                  subject: "Geography",
                  location: "Room 210, Main Building",
                  price: 420.00,
                  spaces: 5,
                  icon: "fas fa-globe-americas"
               },
               {
                  id: 7,
                  subject: "Physics",
                  location: "Lab BG02, Science Block",
                  price: 550.00,
                  spaces: 5,
                  icon: "fas fa-atom"
               },
               {
                  id: 8,
                  subject: "Computer Science",
                  location: "Room BG01, Tech Center",
                  price: 600.00,
                  spaces: 5,
                  icon: "fas fa-laptop-code"
               },
               {
                  id: 9,
                  subject: "Art & Design",
                  location: "Studio BG08, Arts Wing",
                  price: 350.00,
                  spaces: 5,
                  icon: "fas fa-palette"
               },
               {
                  id: 10,
                  subject: "Music",
                  location: "Room 305, Arts Wing",
                  price: 480.00,
                  spaces: 5,
                  icon: "fas fa-music"
               },
               {
                  id: 11,
                  subject: "Physical Education",
                  location: "Gymnasium, Sports Complex",
                  price: 300.00,
                  spaces: 5,
                  icon: "fas fa-running"
               },
               {
                  id: 12,
                  subject: "Drama & Theater",
                  location: "Auditorium, Arts Wing",
                  price: 450.00,
                  spaces: 5,
                  icon: "fas fa-theater-masks"
               }
];

async function seedDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true
  });

  try {
    console.log('🌱 Starting database seeding...');
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db(process.env.DB_NAME);
    const lessonsCollection = db.collection('lessons');

    // Clear existing lessons
    const deleteResult = await lessonsCollection.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing lessons`);

    // Insert new lessons
    const result = await lessonsCollection.insertMany(lessons);
    console.log(`✅ Successfully inserted ${result.insertedCount} lessons`);

    // Display inserted lessons
    const allLessons = await lessonsCollection.find({}).toArray();
    console.log('\n📚 Lessons in database:');
    allLessons.forEach((lesson, index) => {
      console.log(`${index + 1}. ${lesson.subject} - ${lesson.location} - MUR${lesson.price} - ${lesson.spaces} spaces`);
    });

    console.log('\n🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await client.close();
    console.log('🔌 Connection closed');
  }
}

seedDatabase();