import React from "react";
import { Tabs } from "antd";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardBody,
} from "@windmill/react-ui";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import {
  LocaleIcon,
  PeopleIcon,
  CardsIcon,
  ChartsIcon,
  PhoneIcon,
  WebIcon,
} from "../../icons";
import RoundIcon from "../../components/RoundIcon";

const { TabPane } = Tabs;
export default function DetailUniversityModal({
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
}) {
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center appear-done enter-done">
          <div className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-5xl appear-done enter-done">
            <div>
              <ModalBody>
                <div className="flex justify-between mb-5">
                  <div className="capitalize font-semibold text-lg">
                    {/* {idFacultyView[0]?.name_fac} */}
                    Trường Đại Học Việt Hàn
                  </div>
                </div>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Thống kê" key="1">
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 ">
                      <InfoCard title="Khoa" value="4">
                        <RoundIcon
                          icon={CardsIcon}
                          iconColorClass="text-orange-500 dark:text-orange-100"
                          bgColorClass="bg-orange-100 dark:bg-orange-500"
                          className="mr-4"
                        />
                      </InfoCard>

                      <InfoCard title="Phòng ban" value="20">
                        <RoundIcon
                          icon={ChartsIcon}
                          iconColorClass="text-green-500 dark:text-green-100"
                          bgColorClass="bg-green-100 dark:bg-green-500"
                          className="mr-4"
                        />
                      </InfoCard>

                      <InfoCard title="Chuyên ngành" value="10">
                        <RoundIcon
                          icon={PeopleIcon}
                          iconColorClass="text-blue-500 dark:text-blue-100"
                          bgColorClass="bg-blue-100 dark:bg-blue-500"
                          className="mr-4"
                        />
                      </InfoCard>
                      <InfoCard title="Môn học" value="24">
                        <RoundIcon
                          icon={PeopleIcon}
                          iconColorClass="text-blue-500 dark:text-blue-100"
                          bgColorClass="bg-blue-100 dark:bg-blue-500"
                          className="mr-4"
                        />
                      </InfoCard>
                    </div>
                  </TabPane>
                  <TabPane tab="Cán bộ" key="2">
                    Content of Tab Pane 3
                  </TabPane>
                  <TabPane tab="Chuyên ngành" key="3">
                    Content of Tab Pane 3
                  </TabPane>
                  <TabPane tab="Môn học" key="4">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Sinh viên" key="5">
                    Content of Tab Pane 3
                  </TabPane>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <div className="hidden sm:block">
                  <Button onClick={handleCloseModal}>Hủy bỏ</Button>
                </div>
                <div className="block w-full sm:hidden">
                  <Button block size="large" onClick={handleCloseModal}>
                    Hủy bỏ
                  </Button>
                </div>
              </ModalFooter>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
