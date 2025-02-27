import { Icon, Tabs, Spacer } from 'actify'
import { lazy, Suspense, useState, useEffect } from 'react'
import OpenInCodeSandbox from '@/src/components/OpenInCodeSandbox'
import OpenInStackblitz from '@/src/components/OpenInStackblitz'
import SyntaxHighlighter from '@/src/components/SyntaxHighlighter'

const Usage = (props) => {
  const [rawString, setRawString] = useState('')
  const { name, hidecode, ...rest } = props
  const LazyComponent = lazy(() => import(`./../usage/${name}.jsx`))

  useEffect(() => {
    async function loadData() {
      const raw = await import(`./../usage/${name}.jsx?raw`)
      setRawString(raw.default)
    }
    loadData()
  }, [])

  return (
    <Suspense>
      <Tabs value="preview" className="not-prose rounded-lg bg-secondary/10">
        <div className="flex border-b border-[#ccc] dark:border-[#222] w-full">
          <Tabs.Header className="bg-transparent w-full">
            <Tabs.Tab value="preview">
              <Icon name="eye" size={18} />
              Preview
            </Tabs.Tab>
            <Tabs.Tab value="code">
              <Icon name="code-2" size={18} />
              Code
            </Tabs.Tab>
            <Spacer />
            {!hidecode && <OpenInCodeSandbox title={name} code={rawString} />}
            {!hidecode && <OpenInStackblitz title={name} code={rawString} />}
          </Tabs.Header>
        </div>
        <Tabs.Body className="p-2">
          <Tabs.Panel value="preview">
            <LazyComponent name={name} {...rest} />
          </Tabs.Panel>
          <Tabs.Panel value="code">
            {!hidecode && (
              <SyntaxHighlighter language="jsx">{rawString}</SyntaxHighlighter>
            )}
          </Tabs.Panel>
        </Tabs.Body>
      </Tabs>
    </Suspense>
  )
}
export default Usage
