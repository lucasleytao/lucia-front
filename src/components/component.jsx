
// import Link from "next/link"
// import { Card } from "@/components/ui/card"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// export default function Component() {
//   return (
//     <div className="flex flex-col min-h-[100dvh]">
//       <header className="px-4 lg:px-6 h-14 flex items-center">
//         <Link href="#" className="flex items-center justify-center" prefetch={false}>
//           <WebcamIcon className="h-6 w-6" />
//           <span className="sr-only">ChatGPT</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Features
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Pricing
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             About
//           </Link>
//           <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
//             Contact
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center gap-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                   Unlock the Power of Conversational AI
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                   Experience the future of AI-powered assistance with our advanced chatbot. Get personalized responses,
//                   access to vast knowledge, and seamless natural language processing.
//                 </p>
//               </div>
//               <Link
//                 href="#"
//                 className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
//                 prefetch={false}
//               >
//                 Try the Chatbot
//               </Link>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
//               <div className="space-y-4">
//                 <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
//                   Unleash the Power of Conversational AI
//                 </h2>
//                 <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Our advanced chatbot leverages cutting-edge natural language processing and knowledge retrieval to
//                   provide personalized, intelligent responses to your queries.
//                 </p>
//                 <ul className="grid gap-2 py-4">
//                   <li>
//                     <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                     Natural Language Processing
//                   </li>
//                   <li>
//                     <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                     Vast Knowledge Base
//                   </li>
//                   <li>
//                     <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                     Personalized Responses
//                   </li>
//                   <li>
//                     <CheckIcon className="mr-2 inline-block h-4 w-4" />
//                     Continuous Learning
//                   </li>
//                 </ul>
//               </div>
//               <img
//                 src="/placeholder.svg"
//                 width="550"
//                 height="310"
//                 alt="Chatbot"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//           <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
//             <div className="space-y-3">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
//               <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                 Hear from real people who have experienced the power of our advanced chatbot.
//               </p>
//             </div>
//             <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
//               <Card className="flex flex-col gap-4 rounded-lg bg-background p-6 shadow-sm">
//                 <div className="flex items-start gap-4">
//                   <Avatar>
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h4 className="text-sm font-semibold">John Doe</h4>
//                     <p className="text-sm text-muted-foreground">Software Engineer</p>
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "The ChatGPT chatbot has been a game-changer for my\n business. The natural language processing and
//                   personalized\n responses have helped us provide better customer support and\n streamline our
//                   operations."
//                 </p>
//               </Card>
//               <Card className="flex flex-col gap-4 rounded-lg bg-background p-6 shadow-sm">
//                 <div className="flex items-start gap-4">
//                   <Avatar>
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h4 className="text-sm font-semibold">Jane Smith</h4>
//                     <p className="text-sm text-muted-foreground">Marketing Manager</p>
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "I'm amazed by the depth of knowledge and the ability to\n provide relevant, tailored responses that
//                   the ChatGPT\n chatbot has. It's been a valuable tool for my marketing\n team to quickly find
//                   information and generate content."
//                 </p>
//               </Card>
//               <Card className="flex flex-col gap-4 rounded-lg bg-background p-6 shadow-sm">
//                 <div className="flex items-start gap-4">
//                   <Avatar>
//                     <AvatarImage src="/placeholder-user.jpg" />
//                     <AvatarFallback>JD</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h4 className="text-sm font-semibold">Michael Johnson</h4>
//                     <p className="text-sm text-muted-foreground">Business Owner</p>
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "The ChatGPT chatbot has been a game-changer for my\n business. The natural language processing and
//                   personalized\n responses have helped us provide better customer support and\n streamline our
//                   operations."
//                 </p>
//               </Card>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="bg-muted p-6 md:py-12 w-full">
//         <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Company</h3>
//             <Link href="#" prefetch={false}>
//               About Us
//             </Link>
//             <Link href="#" prefetch={false}>
//               Our Team
//             </Link>
//             <Link href="#" prefetch={false}>
//               Careers
//             </Link>
//             <Link href="#" prefetch={false}>
//               News
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Product</h3>
//             <Link href="#" prefetch={false}>
//               Features
//             </Link>
//             <Link href="#" prefetch={false}>
//               Pricing
//             </Link>
//             <Link href="#" prefetch={false}>
//               Integrations
//             </Link>
//             <Link href="#" prefetch={false}>
//               Roadmap
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Resources</h3>
//             <Link href="#" prefetch={false}>
//               Documentation
//             </Link>
//             <Link href="#" prefetch={false}>
//               Blog
//             </Link>
//             <Link href="#" prefetch={false}>
//               Webinars
//             </Link>
//             <Link href="#" prefetch={false}>
//               Support
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Legal</h3>
//             <Link href="#" prefetch={false}>
//               Privacy Policy
//             </Link>
//             <Link href="#" prefetch={false}>
//               Terms of Service
//             </Link>
//             <Link href="#" prefetch={false}>
//               Cookie Policy
//             </Link>
//           </div>
//           <div className="grid gap-1">
//             <h3 className="font-semibold">Contact</h3>
//             <Link href="#" prefetch={false}>
//               Sales
//             </Link>
//             <Link href="#" prefetch={false}>
//               Support
//             </Link>
//             <Link href="#" prefetch={false}>
//               Partnerships
//             </Link>
//             <Link href="#" prefetch={false}>
//               Press
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// function CheckIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M20 6 9 17l-5-5" />
//     </svg>
//   )
// }


// function WebcamIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="10" r="8" />
//       <circle cx="12" cy="10" r="3" />
//       <path d="M7 22h10" />
//       <path d="M12 22v-4" />
//     </svg>
//   )
// }


// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   )
// }