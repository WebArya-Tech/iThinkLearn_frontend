// Dummy Demo Request Data for Admin Panel Testing

export const generateDummyDemoRequests = () => {
  const today = new Date()
  
  const dummyRequests = [
    {
      id: 'demo_1716897600000',
      demoNumber: 'DEMO11716897600000',
      studentName: 'Arjun Singh',
      parentName: 'Rajesh Singh',
      grade: '11-12',
      board: 'CBSE',
      email: 'arjun.singh@gmail.com',
      phone: '9876543210',
      preferredDate: '2026-06-15',
      preferredTime: '9:00 AM - 10:00 AM',
      message: 'Interested in Math and Physics coaching',
      status: 'Pending',
      requestDate: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1716984000000',
      demoNumber: 'DEMO21716984000000',
      studentName: 'Priya Verma',
      parentName: 'Vikram Verma',
      grade: '9-10',
      board: 'ICSE',
      email: 'priya.verma@gmail.com',
      phone: '9765432109',
      preferredDate: '2026-06-20',
      preferredTime: '4:00 PM - 5:00 PM',
      message: 'Looking for competitive exam preparation',
      status: 'Contacted',
      requestDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717070400000',
      demoNumber: 'DEMO31717070400000',
      studentName: 'Aditya Kumar',
      parentName: 'Suresh Kumar',
      grade: '6-8',
      board: 'CBSE',
      email: 'aditya.kumar@yahoo.com',
      phone: '8765432109',
      preferredDate: '2026-06-18',
      preferredTime: '3:00 PM - 4:00 PM',
      message: 'Help with foundation subjects',
      status: 'Scheduled',
      requestDate: new Date().getTime()
    },
    {
      id: 'demo_1717156800000',
      demoNumber: 'DEMO41717156800000',
      studentName: 'Sneha Patel',
      parentName: 'Harsh Patel',
      grade: '11-12',
      board: 'IGCSE',
      email: 'sneha.patel@hotmail.com',
      phone: '7654321098',
      preferredDate: '2026-06-22',
      preferredTime: '10:00 AM - 11:00 AM',
      message: 'Need guidance for IB exams',
      status: 'Pending',
      requestDate: new Date(today.getTime() - 5 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717243200000',
      demoNumber: 'DEMO51717243200000',
      studentName: 'Rohit Sharma',
      parentName: 'Vikram Sharma',
      grade: '9-10',
      board: 'CBSE',
      email: 'rohit.sharma@gmail.com',
      phone: '6543210987',
      preferredDate: '2026-06-16',
      preferredTime: '5:00 PM - 6:00 PM',
      message: 'JEE Main preparation',
      status: 'Completed',
      requestDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717329600000',
      demoNumber: 'DEMO61717329600000',
      studentName: 'Zara Khan',
      parentName: 'Imran Khan',
      grade: '1-5',
      board: 'CBSE',
      email: 'zara.khan@gmail.com',
      phone: '5432109876',
      preferredDate: '2026-06-25',
      preferredTime: '2:00 PM - 3:00 PM',
      message: 'Basic math and English coaching',
      status: 'Cancelled',
      requestDate: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717416000000',
      demoNumber: 'DEMO71717416000000',
      studentName: 'Vishal Pant',
      parentName: 'Akshay Pant',
      grade: '11-12',
      board: 'CBSE',
      email: 'vishal.pant@gmail.com',
      phone: '4321098765',
      preferredDate: '2026-06-17',
      preferredTime: '8:00 AM - 9:00 AM',
      message: 'NEET preparation coaching',
      status: 'Pending',
      requestDate: new Date(today.getTime() - 1 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717502400000',
      demoNumber: 'DEMO81717502400000',
      studentName: 'Isha Desai',
      parentName: 'Mahesh Desai',
      grade: '6-8',
      board: 'IGCSE',
      email: 'isha.desai@gmail.com',
      phone: '3210987654',
      preferredDate: '2026-06-19',
      preferredTime: '11:00 AM - 12:00 PM',
      message: 'Science and Maths tuition',
      status: 'Contacted',
      requestDate: new Date(today.getTime() - 30 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717588800000',
      demoNumber: 'DEMO91717588800000',
      studentName: 'Karan Singh',
      parentName: 'Harjeet Singh',
      grade: '9-10',
      board: 'CBSE',
      email: 'karan.singh@outlook.com',
      phone: '2109876543',
      preferredDate: '2026-06-21',
      preferredTime: '6:00 PM - 7:00 PM',
      message: 'Class 10 board exam preparation',
      status: 'Scheduled',
      requestDate: new Date(today.getTime() - 2 * 60 * 60 * 1000).getTime()
    },
    {
      id: 'demo_1717675200000',
      demoNumber: 'DEMO101717675200000',
      studentName: 'Pooja Gupta',
      parentName: 'Rajiv Gupta',
      grade: '11-12',
      board: 'IB',
      email: 'pooja.gupta@gmail.com',
      phone: '1098765432',
      preferredDate: '2026-06-23',
      preferredTime: '7:00 PM - 8:00 PM',
      message: 'IB curriculum guidance',
      status: 'Pending',
      requestDate: new Date(today.getTime() - 15 * 60 * 1000).getTime()
    }
  ];

  return dummyRequests;
};

export const initializeDummyData = () => {
  const existing = localStorage.getItem('runningClassDemoRequests');
  
  // Only add dummy data if there's no existing data
  if (!existing || JSON.parse(existing).length === 0) {
    const dummyData = generateDummyDemoRequests();
    localStorage.setItem('runningClassDemoRequests', JSON.stringify(dummyData));
    console.log('Dummy demo request data initialized:', dummyData);
  }
};
