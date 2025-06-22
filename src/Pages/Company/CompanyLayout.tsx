import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderbarCompany, SidebarCompany } from '../../Componenets/Comapany';
import PeopleYouMayKnow from '../../Componenets/Shared/PeopleYouMayKnow';

function CompanyLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    {/* Header */}
    <HeaderbarCompany/>

    {/* Main Content Area */}
    <div className="flex flex-1 mt-16"> 
      {/* Sidebar */}
      <SidebarCompany />

     
      <div className="flex flex-row flex-grow overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet /> 
        </div>

       
        <div className="hidden lg:block lg:w-80"> 
          <div className="fixed right-0 top-16 h-full w-80 bg-[#745858] shadow-lg border-l border-gray-200">
            <PeopleYouMayKnow/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CompanyLayout