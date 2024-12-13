import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../Assets/StaticPageImages/assets/profile-pictures/user1.jpg";
import user2 from "../Assets/StaticPageImages/assets/profile-pictures/user2.jpg";
import user3 from "../Assets/StaticPageImages/assets/profile-pictures/user3.jpg";
import user4 from "../Assets/StaticPageImages/assets/profile-pictures/user4.jpg";
import user5 from "../Assets/StaticPageImages/assets/profile-pictures/user5.jpg";
import user6 from "../Assets/StaticPageImages/assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
  },
  {
    user: "Jane Smith",
    company: "Blue Horizon Technologies",
    image: user2,
    text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
  },
  {
    user: "David Johnson",
    company: "Quantum Innovations",
    image: user3,
    text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
  },
  {
    user: "Ronee Brown",
    company: "Fusion Dynamics",
    image: user4,
    text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
  },
  {
    user: "Michael Wilson",
    company: "Visionary Creations",
    image: user5,
    text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
  },
  {
    user: "Emily Davis",
    company: "Synergy Systems",
    image: user6,
    text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
  },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Professional Networking",
    description:
      "Connect with professionals, share insights, and build meaningful relationships within your industry.",
  },
  {
    icon: <Fingerprint />,
    text: "Personalized Profiles",
    description:
      "Showcase your unique skills, experiences, and accomplishments with customizable, detailed profiles.",
  },
  {
    icon: <ShieldHalf />,
    text: "Job Opportunities",
    description:
      "Explore job openings and opportunities tailored to your expertise and career goals.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Updates",
    description:
      "Stay informed with real-time updates and notifications on job posts, professional news, and network activity.",
  },
  {
    icon: <PlugZap />,
    text: "Collaboration Tools",
    description:
      "Engage with your team or peers using built-in tools for collaboration and project discussions.",
  },
  {
    icon: <GlobeLock />,
    text: "Insights & Analytics",
    description:
      "Access detailed analytics on your profile views, post engagements, and network growth to understand your impact.",
  },
];
export const checklistItems = [
  {
    title: "Effortless Networking",
    description:
      "Connect with professionals across industries to build and expand your network seamlessly.",
  },
  {
    title: "Like, Comment, and Share",
    description:
      "Engage with posts from your network by liking, commenting, and sharing to foster interaction and visibility.",
  },
  {
    title: "Showcase Your Skills",
    description:
      "Highlight your expertise, certifications, and achievements to make your profile stand out.",
  },
  {
    title: "Apply for Jobs",
    description:
      "Discover and apply for job opportunities that align with your career goals directly from the platform.",
  },
];


export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
  { href: "registration?role=company", text: "Company Registration" },

];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
