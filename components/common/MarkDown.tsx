import { FC } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

interface IMarkDownProps {
    text?: string
}

const MarkDown: FC<IMarkDownProps> = ({
    text = '',
}) => {
    return (
        <Markdown
            rehypePlugins={[rehypeRaw, remarkGfm]}
            components={{
                code({ className, ...props }) {
                    const hasLang = /language-(\w+)/.exec(className || "")
                    return hasLang ? (
                        <SyntaxHighlighter
                            style={a11yLight}
                            language={hasLang[1]}
                            PreTag="div"
                            className="mockup-code scrollbar-thin scrollbar-track-base-content/5 scrollbar-thumb-base-content/40 scrollbar-track-rounded-md scrollbar-thumb-rounded"
                            // showLineNumbers={true}
                            useInlineStyles={true}
                        >
                            {String(props.children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props} />
                    )
                },
            }}
        >
            {text}
        </Markdown>
    )
}

export default MarkDown