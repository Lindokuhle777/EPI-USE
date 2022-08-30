import React, { useEffect, useState, useContext } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import CustomTreeNode from "./CustomTreeNode";
import { MainContext } from "../../MainContext";

function Home() {
  const [root, setRoot] = useState(null);
  const { employees } = useContext(MainContext);

  

  useEffect(() => {
    setRoot(employees[0]);
  }, []);

  return (
    <div>
      <Tree>
        {root && (
          <CustomTreeNode
            node={new employee(root.firstName, root.children, root.empNum)}
          />
        )}
      </Tree>
    </div>
  );
}

class employee {
  constructor(firstName, children, empNum) {
    this.firstName = firstName;
    this.children = children;
    this.empNum = empNum;
  }

  display() {
    return <TreeNode label={<div>{this.firstName}</div>} />;
  }
}

export default Home;
