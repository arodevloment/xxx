import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Twitter, Send, Copy, Check, Menu, X as CloseIcon, 
  Shield, Eye, Zap, Users, Activity, Mail, Globe, Code, ArrowUpRight, Lock, Server, BarChart3
} from 'lucide-react';

const CONTRACT_ADDRESS = "0x60e265Edb753744c6F5777945E57c96B6aA7464B";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Tokenomics', href: '#tokenomics' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/xxx_coin2026', label: 'X/Twitter' },
  { icon: Send, href: 'https://t.me/xxxcoin2026', label: 'Telegram' },
  { icon: Github, href: 'https://github.com/arodevloment', label: 'GitHub' },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50 pointer-events-none" />
      
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="32"
              height="32"
              className="flex-shrink-0 drop-shadow-[0_0_8px_rgba(255,42,133,0.8)]"
            >
              <rect x="2" y="2" width="28" height="28" rx="8" fill="#0f0f13" stroke="#ff2a85" strokeWidth="2" />
              <text x="16" y="21" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="900" fill="#ff2a85" textAnchor="middle" letterSpacing="0.5">XXX</text>
            </svg>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
              XXX COIN
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Socials */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-xl font-medium text-white hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center justify-center gap-6 mt-12">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <HeroSection />
        <AboutSection />
        <TokenomicsSection />
        <TeamSection />
      </main>

      <Footer />
    </div>
  );
}

function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 shadow-[0_0_15px_rgba(240,0,110,0.1)]"
          >
            <Shield className="w-4 h-4" />
            <span>Audited & Verified BEP-20 Token</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-gradient"
          >
            XXX COIN
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A community-driven digital asset built on the BNB Smart Chain, engineered for maximum transparency, secure decentralized engagement, and high-speed transactions.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a 
              href="https://pancakeswap.finance/swap?outputCurrency=BNB&inputCurrency=0x60e265Edb753744c6F5777945E57c96B6aA7464B&chain=bsc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg pink-glow hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              Buy on PancakeSwap <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href="https://app.uniswap.org/explore/tokens/bnb/0x60e265edb753744c6f5777945e57c96b6aa7464b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg border border-primary/20 hover:border-primary/50 hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
            >
              Buy on Uniswap <ArrowUpRight className="w-4 h-4" />
            </a>
            <a 
              href="https://dexscreener.com/bsc/0xeefe01b2b7b9442430f83853585f28ddc08b28cf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-lg border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4" /> View Chart (DexScreener)
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-primary/10 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative glass-card rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-start overflow-hidden w-full">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Smart Contract (BEP-20)</span>
                <code className="font-mono text-sm sm:text-base text-primary font-medium tracking-tight truncate w-full text-left">
                  {CONTRACT_ADDRESS}
                </code>
              </div>
              <button 
                onClick={handleCopy}
                className="shrink-0 p-3 rounded-lg bg-white/5 hover:bg-primary/20 text-white transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Copy contract address"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                <span className="sr-only sm:not-sr-only text-sm font-medium">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    {
      icon: Shield,
      title: "Security-First",
      desc: "Independently verifiable smart contract on BscScan. No backdoor minting or privileged contract functions."
    },
    {
      icon: Eye,
      title: "Transparency",
      desc: "All token mechanics, supply parameters, and ownership structures are fully auditable by the public at any time."
    },
    {
      icon: Zap,
      title: "High-Speed",
      desc: "Leveraging the BNB Smart Chain infrastructure for near-zero gas fees and instantaneous transactions."
    },
    {
      icon: Users,
      title: "Community-Driven",
      desc: "Governance at the core. Every significant protocol decision is communicated openly, keeping holders in control."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Transparent. Accessible. Decentralized.</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8 pink-glow"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="prose prose-invert prose-lg text-muted-foreground"
          >
            <p>
              XXX COIN is a community-driven digital asset built on the BNB Smart Chain (BEP-20), designed to deliver a transparent, accessible, and robust token experience within the Web3 ecosystem. Our smart contract — independently verifiable on BscScan — has been engineered with security-first principles, ensuring that all token mechanics, supply parameters, and ownership structures are fully auditable by the public at any time.
            </p>
            <p>
              We are committed to zero hidden fees, no backdoor minting, and no privileged contract functions that could compromise holder assets. The project prioritizes high-speed transactions and near-zero gas fees made possible by the BNB Smart Chain infrastructure, making XXX COIN accessible to both retail participants and institutional-grade users alike.
            </p>
            <p>
              Our development roadmap is publicly maintained and milestone-driven, with community governance at its core. Every significant protocol decision is communicated openly through our official channels, ensuring that token holders are always informed and in control. We believe that long-term sustainability in the Web3 space is earned through consistent accountability, continuous technical development, and unwavering financial transparency — values that are foundational to XXX COIN.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeIn} className="glass-card p-6 rounded-2xl group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors border border-primary/20">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TokenomicsSection() {
  const specs = [
    { label: "Project Name", value: "XXX COIN", icon: Globe },
    { label: "Sector", value: "Utility & Community Token", icon: Activity },
    { label: "Network", value: "BNB Smart Chain", icon: Server },
    { label: "Standard", value: "BEP-20", icon: Code },
  ];

  return (
    <section id="tokenomics" className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Token Specifications</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full pink-glow mb-8"></div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {specs.map((spec, idx) => (
            <motion.div key={idx} variants={fadeIn} className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                <spec.icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{spec.label}</p>
                <p className="text-xl font-semibold text-white">{spec.value}</p>
              </div>
            </motion.div>
          ))}
          
          <motion.div variants={fadeIn} className="glass-card p-6 rounded-2xl flex flex-col md:flex-row md:items-center gap-4 md:col-span-2 group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-muted-foreground font-medium mb-1">Contract Address</p>
              <p className="text-lg md:text-xl font-mono text-white truncate group-hover:text-primary transition-colors cursor-default" title={CONTRACT_ADDRESS}>
                {CONTRACT_ADDRESS}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Leadership & Development</h2>
          <p className="text-xl text-muted-foreground">Transparent leadership to ensure trust and accountability.</p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-8 pink-glow"></div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-md mx-auto"
        >
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden group border-primary/20 hover:border-primary/50 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500"></div>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-card to-background border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(240,0,110,0.3)]">
                <span className="text-3xl font-bold tracking-widest" style={{ color: '#ff2a85' }}>XXX</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-1">Aro</h3>
                <p className="text-primary font-medium tracking-wide">Founder & Lead Developer</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
              Spearheading the technical architecture, smart contract deployment, and strategic vision for XXX COIN.
            </p>
            
            <a 
              href="https://github.com/arodevloment" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition-colors border border-white/10 hover:border-white/20 w-full justify-center group-hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            >
              <Github className="w-5 h-5" />
              <span>Verify on GitHub</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-16 border-t border-white/5 bg-background/50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="32"
                height="32"
                className="flex-shrink-0 drop-shadow-[0_0_8px_rgba(255,42,133,0.8)]"
              >
                <rect x="2" y="2" width="28" height="28" rx="8" fill="#0f0f13" stroke="#ff2a85" strokeWidth="2" />
                <text x="16" y="21" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="900" fill="#ff2a85" textAnchor="middle" letterSpacing="0.5">XXX</text>
              </svg>
              <span className="text-2xl font-bold tracking-tight text-white">XXX COIN</span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6 text-lg">
              A premium, community-driven digital asset on the BNB Smart Chain engineered for transparency and secure engagement.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-center gap-6">
            <a href="mailto:aro@trashcoin.site" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-lg">
              <Mail className="w-5 h-5" /> aro@trashcoin.site
            </a>
            <a href="https://www.trashcoin.site" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors text-lg">
              <Globe className="w-5 h-5" /> www.trashcoin.site
            </a>
            
            <div className="flex items-center gap-4 mt-2">
              <a href="https://t.me/xxxcoin2026" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all hover:shadow-[0_0_15px_rgba(240,0,110,0.5)]">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://x.com/xxx_coin2026" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all hover:shadow-[0_0_15px_rgba(240,0,110,0.5)]">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/arodevloment" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary transition-all hover:shadow-[0_0_15px_rgba(240,0,110,0.5)]">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-mono opacity-60">
            © 2026 XXX COIN. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            Built on <span className="text-yellow-500 font-medium flex items-center gap-1.5"><Server className="w-4 h-4" /> BNB Smart Chain</span>
          </p>
        </div>
      </div>
    </footer>
  );
}