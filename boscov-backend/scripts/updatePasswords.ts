import  prisma  from '../src/prisma/Client';
import bcrypt from 'bcryptjs';

const idsParaAtualizar = [1, 2, 3, 4, 5, 6, 10];
const novaSenha = '123456';

async function atualizarSenhas() {
  try {
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    for (const id of idsParaAtualizar) {
      await prisma.usuario.update({
        where: { id },
        data: { senha: senhaCriptografada },
      });

      console.log(`Senha atualizada para o usuário com ID ${id}`);
    }

    console.log('Todas as senhas foram atualizadas com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar senhas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

atualizarSenhas();
