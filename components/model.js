import Link from "next/link"

const Model = ({key, className, href, model}) => {
  return (
    <div key={key} className={className}>
        <Link href={href}>
            {model.name}
        </Link>
    </div>
  )
}

export default Model