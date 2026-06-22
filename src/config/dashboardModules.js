import {
  Users, BookOpen, GraduationCap, DollarSign, FileText,
  ClipboardList, FlaskConical, HelpCircle, Bell,
  UserCheck, MessageCircle, MessageSquare, BarChart2,
  Headphones, Star, Settings
} from 'lucide-react'

export const adminMenuItems = [
  { id: 'home',               label: 'Dashboard',          icon: null,         description: '' },
  { id: 'students',           label: 'Students',           icon: Users,        description: 'View & manage registered students' },
  { id: 'courses',            label: 'Courses',            icon: BookOpen,     description: 'Create & manage course catalog' },
  { id: 'running-classes',    label: 'Running Classes',    icon: GraduationCap,description: 'Manage active classes & enrollments' },
  { id: 'fee-payment',        label: 'Fee Payments',       icon: DollarSign,   description: 'Track payment records' },
  { id: 'demo-requests',      label: 'Demo Requests',      icon: FileText,     description: 'Manage demo class bookings' },
  { id: 'demo-settings',      label: 'Demo Settings',      icon: Settings,     description: 'Manage grades & boards for demo form' },
  { id: 'homework',           label: 'Homework',           icon: ClipboardList,description: 'Assign & manage homework tasks' },
  { id: 'practice-tests',     label: 'Practice Tests',     icon: FlaskConical, description: 'Create & manage tests' },
  { id: 'questions',          label: 'Q&A Management',     icon: HelpCircle,   description: 'Answer student questions' },
  { id: 'announcements',      label: 'Announcements',      icon: Bell,         description: 'Post announcements to students' },
  { id: 'notifications',      label: 'Notifications',      icon: Bell,         description: 'Admin alerts & notifications' },
  { id: 'tutors',             label: 'Tutors',             icon: UserCheck,    description: 'Manage tutor profiles' },
  { id: 'reviews',            label: 'Reviews',            icon: MessageCircle,description: 'View & respond to reviews' },
  { id: 'feedback',           label: 'Feedback',           icon: MessageSquare,description: 'Collect & manage feedback' },
  { id: 'testimonials',       label: 'Testimonials',       icon: Star,         description: 'Manage student testimonials' },
  { id: 'blogs',              label: 'Blogs',              icon: FileText,     description: 'Manage blog posts & subscribers' },
  { id: 'profile',            label: 'Profile',            icon: BarChart2,    description: 'View & edit admin profile' },
]

export const studentMenuItems = [
  { id: 'home',             label: 'Dashboard',        icon: null,            description: '' },
  { id: 'courses',          label: 'My Courses',       icon: BookOpen,        description: 'Browse enrolled courses' },
  { id: 'homework',         label: 'Homework',         icon: ClipboardList,   description: 'View & submit homework' },
  { id: 'practice-tests',   label: 'Practice Tests',   icon: FlaskConical,    description: 'Take practice tests' },
  { id: 'ask-question',     label: 'Ask a Question',   icon: HelpCircle,      description: 'Ask doubts & get help' },
  { id: 'announcements',    label: 'Announcements',    icon: Bell,            description: 'View latest announcements' },
  { id: 'notifications',    label: 'Notifications',    icon: Bell,            description: 'Your notifications' },
  { id: 'fee-payment',      label: 'Fee Payment',      icon: DollarSign,      description: 'Pay fees & view history' },
  { id: 'support',          label: 'Support & Help',   icon: Headphones,      description: 'Get support & raise tickets' },
]
