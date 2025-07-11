import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "./ui/button";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

import Logo from "../assets/logo.png";
import { NavigationMenuDemo } from "./nav-bar-menu-item";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import EditProfileSidebar from "./edit-profile-sidebar";
import NotificationsSidebar from "./notifications-sidebar";
import { fetchData } from "@/apiService";
import { Calendar, MessageCircleQuestion } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  interface UserData {
    _id?: string;
    avatar?: string;
  }

  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchData(
        `users/all-user-details/${user?.userType}/${user._id}`
      );
      setUserData(response?.userData);
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Disclosure as="nav" style={{ backgroundColor: "#09090b" }}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block size-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden size-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div
                className="flex shrink-0 items-center"
                onClick={() => navigate("/")}
              >
                <img alt="Your Company" src={Logo} className="h-8 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavigationMenuDemo />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <TooltipProvider>
                {/* {
                  !user.userType && ()
                } */}
                {(user.userType !== "teacher" || user.userType !== "admin") && (
                  <Menu as="div" className="relative ml-3">
                    <Button
                      className="mr-2"
                      variant={"secondary"}
                      onClick={() => navigate(`/my-activities/${user._id}`)}
                    >
                      My Activities
                    </Button>
                  </Menu>
                )}

                <Tooltip>
                  <TooltipTrigger>
                    <Menu as="div" className="relative ml-3">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => navigate(`/chat/${user._id}`)}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">
                          Ask Question from Teacher
                        </span>
                        <MessageCircleQuestion />
                      </button>
                    </Menu>
                    <TooltipContent>
                      <p> Ask Question from Teacher</p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Menu as="div" className="relative ml-3">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() =>
                          navigate(`/my-calendar-events/${user._id}`)
                        }
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <Calendar aria-hidden="true" className="size-6" />
                      </button>
                    </Menu>
                    <TooltipContent>
                      <p>View Upcoming Events on Calendar</p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Menu as="div" className="relative ml-3">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() =>
                          setIsNotificationsOpen(!isNotificationsOpen)
                        }
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                      </button>
                    </Menu>
                    <TooltipContent>
                      <p>View Your Notifications</p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={userData?.avatar ? userData?.avatar : user.avatar}
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        onClick={() => setIsEditMenuOpen(!isEditMenuOpen)}
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                        onClick={() => {
                          dispatch(logout());
                        }}
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      <EditProfileSidebar
        isOpen={isEditMenuOpen}
        onClose={() => setIsEditMenuOpen(false)}
        user={user}
      />
      <NotificationsSidebar
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </>
  );
}
