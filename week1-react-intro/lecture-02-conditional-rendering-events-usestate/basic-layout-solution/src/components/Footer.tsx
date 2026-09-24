type FooterProps = {
  author: string
}

const Footer = ({ author }: FooterProps) => {
  return (
    <footer>
      © {new Date().getFullYear()} {author}
    </footer>
  )
}

export default Footer
