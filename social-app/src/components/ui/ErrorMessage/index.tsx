interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({ message = "Something went wrong" }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
      <p>{message}</p>
    </div>
  )
}
