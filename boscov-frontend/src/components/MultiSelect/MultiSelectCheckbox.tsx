// src/components/MultiSelectCheckbox.tsx
import type { Genero } from '../Interface/Types';
import { ErrorSpan } from '../Navbar/NavbarStyled'; // Ajuste o caminho se necessário

interface MultiSelectCheckboxProps {
  label: string;
  options: Genero[];
  value: number[];
  onChange: (newValue: number[]) => void;
  errorMessage?: string;
}

export function MultiSelectCheckbox({
  label,
  options,
  value,
  onChange,
  errorMessage,
}: MultiSelectCheckboxProps) {
  return (
    <div>
      <label>{label}</label>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // 5 colunas principais
        gridTemplateRows: 'repeat(6, auto)', // Tenta criar 6 linhas, mas com auto-flow column, pode ajustar
        gap: '5px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '4px',
        gridAutoFlow: 'column', // <---- PREENCHE POR COLUNA
        width: '98%'
        
      }}>
        {options.map((option) => (
          <label
            key={option.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              alignItems: 'center',
              gap: '5px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <input
              type="checkbox"
              name={label.toLowerCase()}
              value={option.id}
              checked={value.includes(option.id)}
              onChange={(e) => {
                const optionId = Number(e.target.value);
                if (e.target.checked) {
                  onChange([...value, optionId]);
                } else {
                  onChange(value.filter((id) => id !== optionId));
                }
              }}
              style={{ accentColor: '#005954' }}
            />
            <span>{option.descricao}</span>
          </label>
        ))}
      </div>
      {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
    </div>
  );
}