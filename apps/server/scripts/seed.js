import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')
  const prompts = [
    {
      title: 'Ultra-Realistic Portrait Generator',
      description: 'Create hyper-realistic portraits with studio lighting and professional composition',
      content: 'Generate a photorealistic portrait of [subject], studio lighting, 85mm lens, shallow depth of field, professional photography, high detail, 8k resolution',
      category: 'image',
      tags: JSON.stringify(['portrait', 'photography', 'realistic', 'trending']),
      votes: 234,
      author: 'Sarah Chen'
    },
    {
      title: 'YouTube Script Writer Pro',
      description: 'Generate engaging YouTube video scripts with hooks, storytelling, and CTAs',
      content: 'Write a YouTube video script about [topic]. Include: 1) Attention-grabbing hook in first 10 seconds, 2) Clear structure with timestamps, 3) Engaging storytelling, 4) Call-to-action at end. Target audience: [audience]. Video length: [duration].',
      category: 'text',
      tags: JSON.stringify(['youtube', 'scripting', 'content', 'trending']),
      votes: 189,
      author: 'Marcus Rivera'
    },
    {
      title: 'Cinematic B-Roll Prompt',
      description: 'Generate stunning cinematic b-roll footage for your video projects',
      content: 'Create cinematic b-roll footage of [scene], golden hour lighting, slow motion, shallow depth of field, color graded, professional cinematography, 4K',
      category: 'video',
      tags: JSON.stringify(['cinematic', 'b-roll', 'video', 'production']),
      votes: 156,
      author: 'Emma Watson'
    },
    {
      title: 'React Component Generator',
      description: 'AI-powered React component creation with TypeScript and best practices',
      content: 'Generate a React component for [component description]. Requirements: TypeScript, functional component, proper types, accessibility, responsive design, clean code. Include props interface and documentation.',
      category: 'code',
      tags: JSON.stringify(['react', 'typescript', 'component', 'trending']),
      votes: 298,
      author: 'David Park'
    },
    {
      title: 'Email Automation Workflow',
      description: 'Create sophisticated email automation sequences for marketing campaigns',
      content: 'Design an email automation workflow for [campaign goal]. Include: 1) Welcome sequence, 2) Nurture emails, 3) Re-engagement series, 4) Segmentation logic, 5) A/B testing recommendations. Target: [audience].',
      category: 'automation',
      tags: JSON.stringify(['email', 'marketing', 'automation', 'workflow']),
      votes: 134,
      author: 'Lisa Thompson'
    },
  ]

  for (const p of prompts) {
    await prisma.prompt.create({ data: p })
  }

  console.log('Seeding complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
