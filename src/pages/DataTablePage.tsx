import { useState, useEffect, useMemo } from "react";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/typedHooks";
import { loadUsers } from "@/store/usersSlice";
import Pagination from "@/components/Pagination.tsx";

const ITEMS_PER_PAGE = 5;

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.users);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(loadUsers({ page, limit: ITEMS_PER_PAGE }));
  }, [dispatch, page]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((u) =>
      [u.email, u.username, u.company?.name].join(" ").toLowerCase().includes(q)
    );
  }, [items, query]);

  const paged = filtered;

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Data Management</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, company..."
            aria-label="Search users"
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  User Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Company
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.length > 0 ? (
                paged.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium">{post.id}</td>
                    <td className="px-6 py-4 text-sm">{post.name}</td>
                    <td className="px-6 py-4 text-sm font-medium max-w-xs truncate">
                      {post.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                      {post?.company?.name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No results found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Pagination
        page={page}
        perPage={ITEMS_PER_PAGE}
        total={10}
        onPageChange={setPage}
      />
    </div>
  );
}
