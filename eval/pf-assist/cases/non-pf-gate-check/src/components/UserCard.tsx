import React from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatar: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatar }) => {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};

export default UserCard;
