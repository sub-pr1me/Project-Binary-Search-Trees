const sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

function newNode(input) {
  return {
    data: input,
    left: null,
    right: null
  };
};

function Tree(arr) {
  let sortedArr = [];
  for (let item of arr) {
      if (!sortedArr.includes(item)) {
          sortedArr.push(item);
      };
  };
  sortedArr.sort((a,b) => a-b);
  let root = buildTree(sortedArr, 0, sortedArr.length-1);
  return root;
};

function buildTree(arr, start, end) {
  if (start > end) return null;
  let mid = start + Math.floor((end-start)/2);

  let root = newNode(arr[mid]);
  root.left = buildTree(arr, start, mid-1);
  root.right = buildTree(arr, mid+1, end);

  return root;  
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function insert(root, key) {
  if (root === null) {
    return newNode(key);
  };
  if (root.data === key) {
    return root;
  };    
  if (key < root.data) {
    root.left = insert(root.left, key);
  } else if (key > root.data) {
    root.right = insert(root.right, key);
  };        
  return root;
};

prettyPrint(Tree(sample));
console.log(' ');
prettyPrint(insert(Tree(sample), 888));