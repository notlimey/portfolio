import {
	Code2,
	Database,
	Layout,
	Server,
	Wrench,
	Cloud,
	Cpu,
} from 'lucide-react';

export const techStack = {
	core: {
		icon: Code2,
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
		items: [
			'TypeScript',
			'C#',
			'.NET',
			'Golang',
			'Rust',
			'Systems Programming',
		],
	},
	frontend: {
		icon: Layout,
		color: 'text-cyan-500',
		bg: 'bg-cyan-500/10',
		items: [
			'Next.js',
			'React',
			'Tailwind CSS',
			'Vue.js',
			'Svelte',
			'Sanity.io',
		],
	},
	backend: {
		icon: Server,
		color: 'text-green-500',
		bg: 'bg-green-500/10',
		items: [
			'.NET Core',
			'Optimizely',
			'ASP.NET',
			'Node.js',
			'API Design',
			'Microservices',
		],
	},
	database: {
		icon: Database,
		color: 'text-purple-500',
		bg: 'bg-purple-500/10',
		items: [
			'PostgreSQL',
			'MongoDB',
			'Redis',
			'SQL',
			'Supabase',
			'Entity Framework',
		],
	},
	devops: {
		icon: Cloud,
		color: 'text-orange-500',
		bg: 'bg-orange-500/10',
		items: ['Docker', 'Azure', 'CI/CD', 'Kubernetes', 'GitHub Actions'],
	},
	tools: {
		icon: Wrench,
		color: 'text-pink-500',
		bg: 'bg-pink-500/10',
		items: [
			'Git',
			'VS Code',
			'WebStorm',
			'Visual Studio',
			'Rider',
			'Linux',
			'MacOS',
		],
	},
};
