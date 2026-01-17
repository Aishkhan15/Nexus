import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle, CreditCard, FileText, Video } from 'lucide-react';

import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

import { Bell, Calendar, TrendingUp } from 'lucide-react';
import ConfirmedMeetingsCard from '../../components/meetings/ConfirmedMeetingsCard';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';


export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  // Get collaboration requests sent by this investor
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [confirmedMeetings, setConfirmedMeetings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const requests = getRequestsFromInvestor(user.id);
      setSentRequests(requests);

      const meetings = JSON.parse(
        localStorage.getItem("confirmedMeetings") || "[]"
      );
      setConfirmedMeetings(meetings);
    }
  }, [user]);


  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);

  // Filter entrepreneurs based on search and industry filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());

    // Industry filter
    const matchesIndustry = selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);

    return matchesSearch && matchesIndustry;
  });

  // Get unique industries for filter
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected =>
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>

        <Link to="/entrepreneurs">
          <Button
            leftIcon={<PlusCircle size={18} />}
          >
            View All Startups
          </Button>
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>

            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-primary-900">
                  {sentRequests.filter(r => r.status === 'pending').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <Users size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Connections</p>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {sentRequests.filter(r => r.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Calendar size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Meetings</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {confirmedMeetings.length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <TrendingUp size={20} className="text-success-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">Industries</p>
                <h3 className="text-xl font-semibold text-success-900">
                  {industries.length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

      </div>


      {/* Entrepreneurs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Sent Requests */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Sent Collaboration Requests
              </h2>
              <Badge variant="primary">
                {sentRequests.filter(r => r.status === 'pending').length} pending
              </Badge>
            </CardHeader>

            <CardBody>
              {sentRequests.length > 0 ? (
                <div className="space-y-4">
                  {sentRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      isInvestor={true}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  You haven't sent any requests yet
                </p>
              )}
            </CardBody>
          </Card>


          <div className="lg:col-span-2 space-y-4">
            {/* Quick Access Card */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Quick Access</h2>
                <Badge variant="primary">4 modules</Badge>
              </CardHeader>

              <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Payments */}
                  <Link to="/payments">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer h-40">
                      <span className="bg-primary-100 p-3 rounded-full mb-2">
                        <CreditCard size={24} className="text-primary-600" />
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-center">Payments</span>
                    </div>
                  </Link>

                  {/* Schedule Meeting */}
                  <Link to="/meeting">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer h-40">
                      <span className="bg-green-100 p-3 rounded-full mb-2">
                        <Calendar size={24} className="text-green-600" />
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-center">Schedule Meeting</span>
                    </div>
                  </Link>

                  {/* Document Chamber */}
                  <Link to="/documents/documentChamber">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer h-40">
                      <span className="bg-blue-100 p-3 rounded-full mb-2">
                        <FileText size={24} className="text-blue-600" />
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-center">Document Chamber</span>
                    </div>
                  </Link>

                  {/* Video Call */}
                  <Link to="/video">
                    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer h-40">
                      <span className="bg-purple-100 p-3 rounded-full mb-2">
                        <Video size={24} className="text-purple-600" />
                      </span>
                      <span className="text-sm font-medium text-gray-900 text-center">Video Call</span>
                    </div>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </div>


        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">

          {/* Recommended Startups */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                Recommended Startups
              </h2>
              <Link
                to="/entrepreneurs"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {filteredEntrepreneurs.slice(0, 3).map(entrepreneur => (
                <EntrepreneurCard
                  key={entrepreneur.id}
                  entrepreneur={entrepreneur}
                />
              ))}
            </CardBody>
          </Card>

          {/* Confirmed Meetings */}
          {confirmedMeetings.length > 0 && (
            <ConfirmedMeetingsCard meetings={confirmedMeetings} />
          )}

        </div>
      </div>

    </div>
  );
};