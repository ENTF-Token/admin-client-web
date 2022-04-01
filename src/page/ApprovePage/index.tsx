import React, { useState, useEffect } from "react";
import { List, message, Avatar } from "antd";
import VirtualList from "rc-virtual-list";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addUser, IUser } from "../../modules/members";
import { Rootstate } from "../../modules";

export default function ApprovePage() {
  /////redux///////////
  const reqArvUser = useSelector((store: Rootstate) => store.members.user);
  const ArvUser = useSelector((store: Rootstate) => store.members.approveUser);
  const dispatch = useDispatch();
  /////redux///////////

  const fakeDataUrl =
    "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
  const ContainerHeight = 500;

  const [data, setData] = useState<IUser[]>([]); //승인요청하는 유저들(useState로 관리)

  const onClickApprove = (email: string) => {
  };

  const onClickReject = (email: string) => { //거절하기
    
  };
  const appendData = async () => {
    try {
      const response = await axios(fakeDataUrl);
      const info=response.data.results
      setData(data.concat(info))
      dispatch(addUser(info));
      message.success(`${response.data.results.length} more users loaded!`);

    } catch {
      console.log("Error");
    }
  };
  useEffect(()=>{
    console.log("data",data)
    console.log("fuck",reqArvUser)

  },[reqArvUser])
  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: any) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />

            <button onClick={() => onClickApprove(item.email)}>승인하기</button>
            <button onClick={() => onClickReject(item.email)}>거절하기</button>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}
