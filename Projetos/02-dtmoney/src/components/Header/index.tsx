import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  onOpenNewTransactionModalOpen: () => void;
}

export function Header(props: HeaderProps) {

  const { onOpenNewTransactionModalOpen } = props;

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dtmoney"></img>
        <button type="button" onClick={onOpenNewTransactionModalOpen}>
          Nova transação
        </button>
      </Content>
    </Container>
  )
}