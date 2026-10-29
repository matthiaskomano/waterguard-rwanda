import { Users, Shield, Wrench, Eye, MoreHorizontal, Mail, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { connection } from "next/server";
import { getTeamMembers } from "./actions";
import { InviteMemberDialog } from "./invite-member-dialog";

export default async function TeamPage() {
  await connection();
  
  // Fetch real data from Supabase
  const teamMembers = await getTeamMembers();

  // Calculate dynamic metrics
  const totalMembers = teamMembers.length;
  const activeTechnicians = teamMembers.filter((m: any) => m.role === 'Technician').length;
  const pendingInvites = teamMembers.filter((m: any) => m.status === 'Pending').length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Users className="h-8 w-8 text-secondary" /> Team Management
          </h1>
          <p className="text-muted-foreground">Manage organization access, assign roles, and invite new members.</p>
        </div>
        
        {/* Replaced hardcoded button with interactive Client Component */}
        <InviteMemberDialog />
      </div>

      {/* Dynamic KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">Active and pending accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Technicians</CardTitle>
            <Wrench className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTechnicians}</div>
            <p className="text-xs text-muted-foreground mt-1">Available for field maintenance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invitations</CardTitle>
            <Mail className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingInvites}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting email verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Team Table */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Members</CardTitle>
          <CardDescription>A list of all users with access to this WaterGuard workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          {teamMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No team members found. Invite someone to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User / ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member: any) => (
                  <TableRow key={member.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold">
                          {member.email?.substring(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-primary">{member.email || "Unknown User"}</div>
                        <div className="text-xs text-muted-foreground">ID: {member.user_id?.substring(0, 8)}...</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {member.role === 'Admin' || member.role === 'Organization Admin' ? <Shield className="h-3.5 w-3.5 text-destructive" /> : null}
                        {member.role === 'Technician' && <Wrench className="h-3.5 w-3.5 text-secondary" />}
                        {member.role === 'Property Manager' && <Users className="h-3.5 w-3.5 text-emerald-500" />}
                        {member.role === 'Viewer' && <Eye className="h-3.5 w-3.5 text-muted-foreground" />}
                        <span className="text-sm">{member.role || "Member"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {member.status === "Pending" ? (
                        <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/50 gap-1">
                          <Clock className="h-3 w-3" /> Pending
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}