
import PyPDF2
import pandas as pd
import tabula
import zipfile
import os
import re

# Paths
pdf_path = r'D:\Desafio_Intuitive_Care\2-teste\extracao\Anexo_I_Rol_2021RN_465.2021_RN627L.2024.pdf'
csv_path = r'D:\Desafio_Intuitive_Care\2-teste\extracao\dados_extraidos.csv'
zip_path = r"D:\Desafio_Intuitive_Care\2-teste\extracao\Teste_William_de_Sousa_Mota.zip"

# Mapping abbreviations to full names
abbreviations = {
    "OD": "SEG ODONTOLOGICA",
    "AMB": "SEG AMBULATORIAL"
}

def extract_tables():
    print("Iniciando extração de tabelas...")
    
    # Use tabula-py to extract tables from PDF
    # This will automatically detect tables on pages 3-181
    tables = tabula.read_pdf(
        pdf_path,
        pages='3-181',
        multiple_tables=True,
        guess=True,
        lattice=True,  # Use lattice mode for tables with grid lines
        pandas_options={'header': None}  # Don't use first row as header
    )
    
    print(f"Extraídas {len(tables)} tabelas do PDF")
    
    # Process and combine all tables
    all_data = []
    for i, table in enumerate(tables):
        if len(table) > 0:  # Skip empty tables
            # Clean the table data
            table = clean_table(table)
            all_data.append(table)
    
    # Combine all tables into one DataFrame
    if all_data:
        combined_data = pd.concat(all_data, ignore_index=True)
        
        # Replace abbreviations
        for abbr, full_name in abbreviations.items():
            combined_data = combined_data.replace(abbr, full_name)
        
        # Save to CSV
        combined_data.to_csv(csv_path, index=False, encoding='utf-8')
        print(f"Dados salvos em {csv_path}")
        
        # Create ZIP file
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            zipf.write(csv_path, os.path.basename(csv_path))
        print(f"Arquivo compactado em {zip_path}")
    else:
        print("Nenhuma tabela válida encontrada")

def clean_table(df):
    # Drop completely empty rows and columns
    df = df.dropna(how='all').dropna(axis=1, how='all')
    
    # Fill NaN values with empty strings
    df = df.fillna('')
    
    # Clean cell values (remove extra spaces, newlines)
    for col in df.columns:
        if df[col].dtype == object:  # Only process string columns
            df[col] = df[col].astype(str).apply(lambda x: re.sub(r'\s+', ' ', x).strip())
    
    return df

if __name__ == "__main__":
    try:
        extract_tables()
        print("Processo concluído com sucesso!")
    except Exception as e:
        print(f"Erro durante o processamento: {str(e)}")

