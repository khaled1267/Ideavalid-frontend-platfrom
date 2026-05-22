"use client";

import { Button } from "@heroui/react";
import {
  ArrowRight,
  Star,
  Play,
  TrendingUp,
  CheckCircle,
  Check,
  Sparkles,
  Lightbulb,
  ShieldCheck,
  Users,
  Trophy,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Hero = () => {
  return (
    <section className="relative overflow-hidden   bg-base-300 ">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#00A896]/10 to-transparent blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#028090]/10 to-transparent blur-3xl rounded-full -z-10"></div>

      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper shadow-[0_10px_30px_rgba(0,0,0,0.02)] rounded-[2.5rem]"
      >
        <SwiperSlide className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#00A896]/10 to-[#028090]/10 rounded-full border border-[#00A896]/20 text-[#028090] font-bold text-xs md:text-sm">
                  <Star className="w-4 h-4 fill-[#00A896] text-[#00A896]" />
                  <span>Join 5,000+ Innovators & Founders Worldwide</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Share & Validate Your{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A896] to-[#028090]">
                    Startup Ideas
                  </span>{" "}
                  Globally
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Do not let your brilliant concepts fade in the dark. Publish
                  them securely on IdeaVault, receive constructive expert
                  critiques, and test market demand instantly.
                </p>
                <div className="flex gap-4 pt-2">
                  <Button
                    href="/add-idea"
                    size="lg"
                    className="h-14 px-8 text-base font-bold rounded-full text-white bg-gradient-to-r from-[#00A896] to-[#028090] shadow-lg shadow-[#00A896]/20 hover:scale-[1.02] transition-transform duration-300 group"
                  >
                    Launch Your Idea{" "}
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="bordered"
                    size="lg"
                    className="h-14 px-8 text-base font-bold rounded-full group border-gray-200 bg-white shadow-sm"
                  >
                    <Play className="mr-2 fill-slate-800 text-slate-800 group-hover:scale-110 transition-transform w-4 h-4" />{" "}
                    Explore Platform
                  </Button>
                </div>
                <div className="flex items-center gap-6 pt-4 text-slate-400 font-semibold text-xs tracking-wider uppercase">
                  <span className="flex items-center gap-1">
                    🚀 ProductHunt Featured
                  </span>
                  <span className="flex items-center gap-1">
                    ⚡ YC Global Hub
                  </span>
                </div>
              </div>

              <div className="relative group justify-self-center lg:justify-self-end w-full max-w-[480px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00A896] to-[#028090] rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-700"></div>
                <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-square">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                    alt="Brainstorming Ideas"
                    fill
                    className="rounded-[2rem] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <Image
                            key={i}
                            src={`https://i.pravatar.cc/100?img=${i + 15}`}
                            width={38}
                            height={38}
                            className="w-9 h-9 rounded-full border-2 border-white shadow-md object-cover"
                            alt="avatar"
                          />
                        ))}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">
                          Active Founders Circle
                        </p>
                        <p className="text-[10px] text-slate-500">
                          340+ tech models submitted today
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 text-emerald-600 font-bold text-xs md:text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Discover Next-Gen Tech Concepts</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Explore Advanced{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-[#028090]">
                    AI & SaaS
                  </span>{" "}
                  Blueprints
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Filter breakthrough projects through curated technical niches
                  like Artificial Intelligence, FinTech, Web3, and BioTech.
                  Upvote and follow ideas that trigger your interest.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    href="/ideas"
                    size="lg"
                    className="h-14 px-8 text-base font-bold rounded-full bg-gradient-to-r from-emerald-500 to-[#028090] text-white shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform duration-300 group"
                  >
                    Browse Categories
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="flex items-center gap-8 pt-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      1.5K+
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      Live Concepts
                    </p>
                  </div>
                  <div className="w-[1px] h-8 bg-gray-200"></div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      24+
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      Niche Domains
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 flex items-center justify-center w-full max-w-[480px] justify-self-center">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 blur-3xl opacity-10 rounded-full"></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl p-5 w-full border border-slate-100 rotate-[-3deg] hover:rotate-0 transition duration-500">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                    alt="AI Project Concept"
                    width={500}
                    height={500}
                    className="rounded-2xl object-cover h-[260px] w-full"
                  />
                  <div className="pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-base text-slate-800">
                        Decentralized LLM Mesh
                      </h3>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        AI Niche
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs pt-2">
                      Secure, p2p infrastructure built for running global
                      open-source LLMs cooperatively.
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <Image
                            key={i}
                            src={`https://i.pravatar.cc/100?img=${i + 35}`}
                            alt="expert avatar"
                            width={30}
                            height={30}
                            className="rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full bg-[#00A896] text-white font-bold text-xs px-4 shadow-sm"
                      >
                        Upvote Idea
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-50">
                  <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-800">
                      Concept Verified
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Validated by 8 Tech Mentors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative justify-self-center w-full max-w-[480px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[2.5rem] blur opacity-15"></div>
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Mentorship Session"
                    width={700}
                    height={700}
                    className="object-cover h-[420px] w-full"
                  />
                  <div className="absolute bottom-6 right-6 bg-slate-900/95 text-white rounded-2xl px-5 py-4 shadow-xl backdrop-blur-sm">
                    <h3 className="font-bold text-sm flex items-center gap-1.5 text-cyan-400">
                      <ShieldCheck className="w-4 h-4" /> Ironclad NDA
                      Protection
                    </h3>
                    <p className="text-[11px] text-slate-300 pt-0.5">
                      Control who copies or views your blueprints
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-600 font-bold text-xs md:text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Idea Incubation System</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Connect with Top{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600">
                    Startup Mentors
                  </span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Get structural insights from seasoned veterans without risking
                  intellectual theft. Establish custom visibility controls on
                  your dashboard.
                </p>
                <div className="space-y-3">
                  {[
                    "Protect Ideas with Granular Visibility Settings (Private/Public)",
                    "Direct Pitch-Deck Reviews from Serial Entrepreneurs",
                    "Build Professional Interactions securely via Protected Channels",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white shadow-sm rounded-xl p-3.5 border border-slate-100"
                    >
                      <div className="w-7 h-7 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                        <Check className="text-cyan-600 w-4 h-4" />
                      </div>
                      <p className="font-semibold text-xs md:text-sm text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <Button
                    href="/my-interactions"
                    size="lg"
                    className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform duration-300"
                  >
                    Initiate Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-6 md:space-y-8 text-left order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-600 font-bold text-xs md:text-sm">
                  <Users className="w-4 h-4" />
                  <span>Talent & Resource Matchmaking</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Find Co-Founders{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                    & Early Backers
                  </span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Great ideas require elite builders. Meet CTOs, Product
                  Managers, and Angel Backers waiting to collaborate. Trade
                  equities or pull expertise onto your board smoothly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 mt-0.5 font-bold">
                      CTO
                    </div>
                    <p className="text-xs md:text-sm text-slate-600">
                      <span className="font-bold text-slate-800">
                        Technical Matching:
                      </span>{" "}
                      Connect with senior engineers matched via AI based on your
                      concept stack.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 text-purple-600 mt-0.5">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <p className="text-xs md:text-sm text-slate-600">
                      <span className="font-bold text-slate-800">
                        Micro-Grants:
                      </span>{" "}
                      Get reviewed for internal incubation grants worth up to
                      $10k to kickstart MVPs.
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <Button
                    href="/ideas"
                    size="lg"
                    className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-transform duration-300"
                  >
                    Assemble Your Team
                  </Button>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 w-full max-w-[480px] justify-self-center">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-10 rounded-full"></div>
                <div className="relative bg-white rounded-[2rem] shadow-2xl p-6 border border-slate-100">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                      🧠
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-800">
                        SaaS FinTech Project
                      </h3>
                      <p className="text-[10px] text-slate-400">
                        Looking for a Co-Founder / Developer
                      </p>
                    </div>
                  </div>
                  <div className="py-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Equity Offered:</span>{" "}
                      <span className="font-bold text-slate-800">
                        25% - 40%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Current Phase:</span>{" "}
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-2 rounded">
                        Wireframing
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl text-center">
                      <p className="font-black text-slate-800 text-sm">48</p>
                      <p className="text-[10px] text-slate-400">Applications</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl text-center">
                      <p className="font-black text-emerald-600 text-sm">
                        $8.5K
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Pledged Funds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="px-4 md:px-12">
          <div className="max-w-7xl mx-auto py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative justify-self-center w-full max-w-[480px]">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[2.5rem] blur opacity-10"></div>
                <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl border border-slate-100 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                    alt="Pitching Event"
                    width={500}
                    height={500}
                    className="rounded-[2rem] object-cover h-[300px] w-full"
                  />
                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        IdeaVault Spring Hackathon 2026
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Submissions close in 4 days
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                        $5,000 Prize
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 rounded-full border border-amber-500/20 text-amber-600 font-bold text-xs md:text-sm">
                  <Trophy className="w-4 h-4" />
                  <span>Monthly Innovation Challenges</span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  Compete in Live{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                    Pitch Wars
                  </span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  Turn your static dashboard ideas into real competitive
                  victories. Submit concepts to monthly theme-based hackathons,
                  gain global leaderboard exposure, and win premium corporate
                  sponsorships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button
                    href="/ideas"
                    size="lg"
                    className="h-14 px-8 text-base font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform duration-300"
                  >
                    Enter Open Challenges
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;
