import {
	CodeIndent,
	CodeLine,
	CodeLineFunction,
	CodeLineWithInput,
	CodeLineWithTextarea,
	SyntaxHighlight,
} from '~/shared/components/code';

export const ContactForm = () => (
	<div className="mt-12 p-6 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm">
		<div className="text-slate-500 mb-2">
			{'// Want to collaborate? Send an email to me!'}
		</div>
		<div className="text-slate-300 space-y-1">
			<CodeLineWithInput
				number={1}
				name="subject"
				placeholder="Subject"
			/>
			<CodeLineWithInput number={2} name="name" placeholder="John Doe" />
			<CodeLineWithInput
				number={3}
				name="email"
				placeholder="john@doe.com"
			/>
			<CodeLineWithTextarea
				start={4}
				end={7}
				name="message"
				placeholder="Message"
			/>
			<CodeLine number={8} />
			<CodeLineFunction
				name="collaborate"
				args={['data']}
				async={true}
				lineNumber={11}
				lineCount={3}
				onRun={() => {
					console.log('run');
				}}
			>
				<CodeLine number={11}>
					<CodeIndent />
					<SyntaxHighlight color="orange">const</SyntaxHighlight>
					<SyntaxHighlight color="blue">response</SyntaxHighlight>
					<SyntaxHighlight color="orange">=</SyntaxHighlight>
					<SyntaxHighlight color="blue">await</SyntaxHighlight>
					<div>
						<SyntaxHighlight color="white">axios</SyntaxHighlight>
						<SyntaxHighlight color="blue">.post</SyntaxHighlight>
						<SyntaxHighlight color="pink">
							('/api/collaborate/sendEmail'
						</SyntaxHighlight>
						<SyntaxHighlight color="orange">,</SyntaxHighlight>
						<SyntaxHighlight color="white"> data</SyntaxHighlight>
						<SyntaxHighlight color="pink">)</SyntaxHighlight>
						<SyntaxHighlight color="white">;</SyntaxHighlight>
					</div>
				</CodeLine>
				<CodeLine number={12}>
					<CodeIndent />
					<SyntaxHighlight color="orange">return</SyntaxHighlight>
					<div>
						<SyntaxHighlight color="blue">response</SyntaxHighlight>
						<SyntaxHighlight color="white">.data;</SyntaxHighlight>
					</div>
				</CodeLine>
			</CodeLineFunction>
		</div>
	</div>
);
