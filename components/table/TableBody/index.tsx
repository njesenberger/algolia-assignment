export default function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="table-body">
      {children}
    </tbody>
  );
};