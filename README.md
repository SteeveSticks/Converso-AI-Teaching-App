# Converso - AI Teaching Companion Platform

<img width="1353" height="680" alt="image" src="https://github.com/user-attachments/assets/3cd99141-7217-4cc5-8197-ca5a10866080" />

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=flat-square) 

Converso is an innovative AI-powered teaching platform where students can engage in real-time voice conversations with AI teaching companions across multiple subjects. Built with cutting-edge technologies, it provides personalized, interactive learning experiences.

> **Live Companion Learning with AI** 🎓

## 🌟 Features

### Core Functionality
- **Real-time Voice Sessions** - Engage in natural voice conversations with AI tutors powered by Vapi
- **Multiple Subjects** - Learn from companions specialized in:
  - Mathematics
  - Languages
  - Science
  - History
  - Coding
  - Geography
  - Economics
  - Finance
  - Business

- **Interactive Learning** - Dynamic transcripts showing real-time conversation flow
- **Personalized Companions** - Create and customize AI teaching companions with different speaking styles
- **Session History** - Track completed learning sessions
- **Bookmarking** - Save favorite companions for quick access

### User Features
- **Authentication** - Secure user authentication via Clerk
- **Subscription Tiers** - Multiple pricing plans with feature limits
- **Companion Creation** - Users can create their own AI teaching companions
- **Query Filtering** - Search and filter companions by subject and topic
- **Microphone Control** - Toggle audio input during sessions
- **Session Transcripts** - View conversation history with timestamps

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14+](https://nextjs.org) (App Router)
- **Language**: [TypeScript 5+](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 3+](https://tailwindcss.com)
- **UI Components**: Custom components + headless UI utilities
- **Animation**: [Lottie React](https://airbnb.io/lottie)
- **Image Optimization**: Next.js Image component

### Backend & Services
- **Authentication**: [Clerk](https://clerk.com)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **AI Voice**: [Vapi.ai](https://vapi.ai)
- **LLM**: OpenAI GPT-4
- **Speech Recognition**: Deepgram Nova-3
- **Text-to-Speech**: ElevenLabs

### Developer Tools
- **Error Tracking**: Sentry
- **Linting**: ESLint
- **PostCSS**: Post-processing CSS
- **Package Manager**: npm

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** 18+ and npm 9+
- **Git** for version control
- API keys from:
  - [Clerk](https://dashboard.clerk.com) - User authentication
  - [Supabase](https://supabase.com) - Database
  - [Vapi.ai](https://dash.vapi.ai) - Voice AI
  - [OpenAI](https://platform.openai.com) - GPT-4 API key (configured in Vapi)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/converso-ai-teaching-app.git
cd converso-ai-teaching-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_anon_your_key_here

# Vapi AI Voice
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token_here

# Sentry (Optional - for error tracking)
NEXT_PUBLIC_SENTRY_AUTH_TOKEN=your_sentry_token_here
```

### 4. Set Up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create the following tables in your Supabase database:

```sql
-- Create companions table
CREATE TABLE public.companions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying,
    subject character varying,
    topic character varying,
    style character varying,
    voice character varying,
    duration bigint,
    author character varying,
    CONSTRAINT companions_pkey PRIMARY KEY (id)
);

-- Create session_history table
CREATE TABLE public.session_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id character varying,
    companion_id uuid,
    CONSTRAINT session_history_pkey PRIMARY KEY (id),
    CONSTRAINT session_history_companion_id_fkey 
        FOREIGN KEY (companion_id) 
        REFERENCES public.companions(id) 
        ON UPDATE CASCADE ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE public.companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companions
CREATE POLICY "Enable read access for all users" ON public.companions
    FOR SELECT USING (true);

CREATE POLICY "Clerk" ON public.companions
    TO authenticated
    USING ((SELECT auth.jwt()) IS NOT NULL)
    WITH CHECK ((SELECT auth.jwt()) IS NOT NULL);

-- RLS Policies for session_history
CREATE POLICY "All" ON public.session_history
    FOR SELECT TO anon USING (true);

CREATE POLICY "Clerk" ON public.session_history
    TO authenticated
    USING ((SELECT auth.jwt()) IS NOT NULL)
    WITH CHECK ((SELECT auth.jwt()) IS NOT NULL);

```

### 5. Set Up Vapi Configuration

Configure your Vapi assistant with:
- **Model**: OpenAI GPT-4
- **Transcriber**: Deepgram Nova-3 (English)
- **Voice Provider**: ElevenLabs
- **Features**: Transcript support enabled

### 6. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Subscription System
Three-tier system:
- Free: 3 companion limit
- Pro Lite: 10 companion limit
- Pro: Unlimited companions

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🌐 Environment Configuration

### Development
- Runs on [http://localhost:3000](http://localhost:3000)
- Hot reload enabled
- Full debugging support

### Production
- Optimized build
- SWR caching
- Sentry error tracking
- CDN-ready assets
- 
## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings
4. Deploy automatically on push

```bash
# One-click deployment
npm install -g vercel
vercel
```

## 🐛 Troubleshooting

### "No suitable key or wrong key type" Error
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Ensure Supabase URL is correct
- Check that environment variables are loaded

### Voice Session Not Starting
- Confirm `NEXT_PUBLIC_VAPI_WEB_TOKEN` is set
- Check browser microphone permissions
- Verify Vapi API status
- Check browser console for errors

### Database Connection Issues
- Verify Supabase project is active
- Check network connectivity
- Confirm anon key has correct permissions
- Review Supabase logs

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Write meaningful commit messages
- Add comments for complex logic

## 📞 Support & Contact
- **Email**: stephenadebanjo86@gmail.com

## 💡 Credits

Built with ❤️ using modern web technologies.

---

**Made with ❤️ for educators and learners worldwide**
