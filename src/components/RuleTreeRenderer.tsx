import type { ReactNode } from 'react';

export interface RuleNode {
  text: string;
  children: RuleNode[];
}

/** Parse indented rule text into a nested tree structure. */
export function parseRuleToTree(text: string): RuleNode[] {
  const lines = text.split('\n');
  const rootNodes: RuleNode[] = [];
  const stack: Array<{ node: RuleNode; level: number }> = [];

  for (const line of lines) {
    if (!line.trim()) continue;

    const match = line.match(/^(\s*)-\s+(.*)/);
    if (match) {
      const spaces = match[1].length;
      const content = match[2];

      let level = 1;
      if (spaces >= 2 && spaces < 6) level = 2;
      else if (spaces >= 6) level = 3;

      const newNode: RuleNode = { text: content, children: [] };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        rootNodes.push(newNode);
        stack.push({ node: newNode, level });
      } else {
        stack[stack.length - 1].node.children.push(newNode);
        stack.push({ node: newNode, level });
      }
    } else {
      const newNode: RuleNode = { text: line, children: [] };
      rootNodes.push(newNode);
      stack.length = 0;
      stack.push({ node: newNode, level: 0 });
    }
  }

  return rootNodes;
}

/** Render **bold** markdown markers as JSX with <strong> tags. */
export function renderFormattedText(text: string): ReactNode {
  if (!text) return text;
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export function RuleTreeRenderer({ nodes }: { nodes: RuleNode[] }) {
  if (!nodes || nodes.length === 0) return null;

  return (
    <>
      {nodes.map((node, i) => (
        <div key={i}>
          <div className="rule-text-block" style={{ marginTop: i > 0 ? '4px' : '0' }}>
            {renderFormattedText(node.text)}
          </div>

          {node.children.length > 0 && (
            <ul className="nested-rule-list" style={{ marginTop: '4px', marginBottom: '4px', paddingLeft: '24px' }}>
              {node.children.map((child, j) => (
                <li key={j} style={{ marginTop: '4px' }}>
                  <RuleTreeRenderer nodes={[child]} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}
