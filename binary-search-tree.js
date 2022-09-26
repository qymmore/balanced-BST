class Node {
	constructor(data) {
		this.data = data
		this.leftBranch = null
		this.rightBranch = null
	}
}

class Tree {
	constructor(array) {
		this.array = [...removeDuplicates(mergeSort(array))]
		this.root = this.buildTree(this.array, 0, this.array.length - 1)
		this.preOrderData = []
		this.inOrderData = []
		this.postOrderData = []
	}
	
	buildTree(array, start, end) {
		//base case
		if (start > end) return null
		
		let mid = parseInt((start + end)/2)
		let rootNode = new Node(array[mid])
		
		//recursive cases for building branches
		rootNode.leftBranch = this.buildTree(array, start, mid-1)
		rootNode.rightBranch = this.buildTree(array, mid+1, end)
		
		return rootNode
	}
	
	insert(value, root = this.root) {
		
		//if root is empty create a node
		if(root == null) {
			root = new Node(value)
			return root
		}
		
		//value is smaller than root -> goes on the left branch
		if(value < root.data) {
			root.leftBranch = this.insert(value, root.leftBranch)
		} else {
			root.rightBranch = this.insert(value, root.rightBranch)
		}
		return root
	}
	
	delete(value, root = this.root) {
		if(root == null) {
			return root
		} 
		
		if(value < root.data) {
			root.leftBranch = this.delete(value, root.leftBranch)
		} else if(value > root.data) {
			root.rightBranch = this.delete(value, root.rightBranch)
		} else {
			if(root.leftBranch == null){
				return root.rightBranch
			} 
			else if(root.rightBranch == null) {
				return root.leftBranch
			} 
			root.data = minValue(root)
			root.rightBranch = this.delete(root.rightBranch, root.data)
		}
		return root
	}
	
	find(value, root = this.root) {
		if(root == null) return false;
		
		if(root.data == value) return root;
		
		if(root.data < value) {
			return this.find(value, root.rightBranch)
		} 
		return this.find(value, root.leftBranch)
	}
	
	levelOrder(root) {
		let queue = []
		let output = []
		
		if(root == null) return;
		
		queue.push(root)
		
		while(queue.length > 0) {
			let current = queue.shift(root)
			output.push(current.data)
			
			if(current.leftBranch !== null) {
				queue.push(current.leftBranch)
			}
			if(current.rightBranch !== null) {
				queue.push(current.rightBranch)
			}
		}
		return output
	}
	
	inOrder(root) {
	 if (root == null) return;

    if (root.leftBranch !== null){
      this.inOrder(root.leftBranch)
    }

    if (root.data !== undefined) {
      this.inOrderData.push(root.data)
    }

    if (root.rightBranch !== null) {
      this.inOrder(root.rightBranch)
    }
		return this.inOrderData
	}
	
	preOrder(root) {
		if(root == null) return;
		
		if(root.data !== undefined) {
			this.preOrderData.push(root.data)
		}
		
		if(root.leftBranch !== null) {
			this.preOrder(root.leftBranch)
		}
		
		if(root.rightBranch !== null) {
			this.preOrder(root.rightBranch)
		}
		
		return this.preOrderData
	}
	
	postOrder(root) {
		if(root == null) return;
		
		if(root.leftBranch !== null) {
			this.postOrder(root.leftBranch)
		}
		
		if(root.rightBranch !== null) {
			this.postOrder(root.rightBranch)
		}
		
		if(root.data !== undefined) {
			this.postOrderData.push(root.data)
		}
		return this.postOrderData
	}
	
	height(root) {
		if(root == null) {
			return -1
		}
		
		return Math.max(this.height(root.leftBranch), this.height(root.rightBranch)) + 1
	}
	
	depth(node, root = this.root) {
		let depth = -1
		
		if(node == null) return depth
		
		if((root == node) || (depth = this.depth(node, root.leftBranch)) >= 0 || (depth = this.depth(node, root.rightBranch)) >= 0) {
			return depth + 1
		}
		return depth
	}

    isBalanced(root) {
        if(root == null) return false;

        let leftHalf = root.leftBranch;
        let rightHalf = root.rightBranch;

        let checkBalance = this.height(leftHalf) - this.height(rightHalf);

        if(Math.abs(checkBalance) > 1) {
            return false;
        } else {
            return true;
        }
    }

    traverse(root, array) {
        if(array !== undefined) array.push(root.data);

        if(root.leftBranch !== null) {
            this.traverse(root.leftBranch, array);
        }

        if(root.rightBranch !== null) {
            this.traverse(root.rightBranch, array);
        }
        return array;
    }

    reBalance() {
        if(this.isBalanced(this.root)) return this.root; //tree is already balanced

        let rebalancedTree = [];
        rebalancedTree = this.traverse(this.root, rebalancedTree);

        let balancedTree = new Tree(rebalancedTree);
        return balancedTree.root;
    }
}

function minValue(root) {
	let minVal = root.data
	
	while(root !== null) {
		minVal = root.data
		root = root.leftBranch
	}
	return minVal
}

function merge(A, B) {
		let C = []
		
		while(A.length && B.length) {
			if(A[0] < B[0]) {
				C.push(A.shift())
			} else {
				C.push(B.shift())
			}
		}
		return [...C, ...A, ...B]
}

function mergeSort(array) {
		let half = array.length/2
		
		if(array.length < 2) { //if array has only one item in it 
  		return array;
		} 
  	let A = array.splice(0, half) 
  	
		return merge(mergeSort(A),mergeSort(array));
}

function prettyPrint(node, prefix=' ', isLeft = true) {
	if (node.rightBranch !== null) {
			prettyPrint(node.rightBranch, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
  	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		
  	if (node.leftBranch !== null) {
			prettyPrint(node.leftBranch, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
}

//removes duplicate values from array
function removeDuplicates(array) {
	return [...new Set(array)]
}

export {Tree}
