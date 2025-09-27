'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// ReactQuill ni dynamic import qilamiz chunki SSR bilan muammo bo'lishi mumkin
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
	value: string
	onChange: (value: string) => void
	placeholder?: string
	className?: string
}

const RichTextEditor = ({
	value,
	onChange,
	placeholder = 'Matn kiriting...',
	className = '',
}: RichTextEditorProps) => {
	// Toolbar konfiguratsiyasi
	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, false] }], // Heading 1, Heading 2, Paragraph
				['bold', 'italic', 'underline'], // Bold, Italic, Underline
				[{ list: 'ordered' }, { list: 'bullet' }], // Lists
				['blockquote'], // Blockquote
				['link'], // Link
				['clean'], // Remove formatting
			],
		},
	}

	// Formats ro'yxati
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'list',
		'bullet',
		'blockquote',
		'link',
	]

	// Custom styles
	useEffect(() => {
		// Custom CSS styles qo'shamiz
		const style = document.createElement('style')
		style.textContent = `
			.ql-toolbar {
				border: 1px solid #e2e8f0 !important;
				border-bottom: none !important;
				border-radius: 0.375rem 0.375rem 0 0 !important;
				background: #f8fafc;
			}
			
			.ql-container {
				border: 1px solid #e2e8f0 !important;
				border-radius: 0 0 0.375rem 0.375rem !important;
				font-family: inherit !important;
				font-size: 16px !important;
			}
			
			.ql-editor {
				min-height: 150px;
				padding: 16px !important;
				line-height: 1.6 !important;
			}
			
			.ql-editor h1 {
				font-size: 2.5rem !important;
				font-weight: 700 !important;
				line-height: 1.1 !important;
				margin: 1.5rem 0 1rem 0 !important;
			}
			
			.ql-editor h2 {
				font-size: 2rem !important;
				font-weight: 600 !important;
				line-height: 1.2 !important;
				margin: 1.25rem 0 0.75rem 0 !important;
			}
			
			.ql-editor p {
				font-size: 1.125rem !important;
				margin: 0.75rem 0 !important;
				line-height: 1.7 !important;
			}
			
			.ql-editor strong {
				font-weight: 600 !important;
			}
			
			.ql-editor em {
				font-style: italic !important;
			}
			
			.ql-editor ul, .ql-editor ol {
				margin: 0.5rem 0 !important;
				padding-left: 1.5rem !important;
			}
			
			.ql-editor blockquote {
				border-left: 4px solid #3b82f6 !important;
				margin: 1rem 0 !important;
				padding: 0.5rem 0 0.5rem 1rem !important;
				background: #f1f5f9 !important;
				font-style: italic !important;
			}
			
			.ql-snow .ql-tooltip {
				z-index: 1000 !important;
			}
			
			.ql-snow .ql-picker-label {
				color: #374151 !important;
			}
			
			.ql-snow .ql-stroke {
				stroke: #374151 !important;
			}
			
			.ql-snow .ql-fill {
				fill: #374151 !important;
			}
			
			.ql-snow .ql-picker-options {
				background: white !important;
				border: 1px solid #e2e8f0 !important;
				border-radius: 0.375rem !important;
				box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
			}
		`
		document.head.appendChild(style)

		return () => {
			document.head.removeChild(style)
		}
	}, [])

	return (
		<div className={`rich-text-editor ${className}`}>
			<ReactQuill
				theme='snow'
				value={value}
				onChange={onChange}
				modules={modules}
				formats={formats}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default RichTextEditor
