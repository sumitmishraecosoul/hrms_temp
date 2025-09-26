import React from 'react';

const EmployeeEditForm = () => {
  return (
    <div>
      <form>
        <div>
            <label>E.ID</label>
            <input type="text" />
        </div>
        <div>
            <label>Name</label>
            <input type="text" />
        </div>
        <div>
            <label>Email</label>
            <input type="email" />
        </div>
        <div>
            <label>Department</label>
            <input type="text" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;