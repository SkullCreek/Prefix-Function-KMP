function longestPrefix(str) {
        
    
    var table = new Array(str.length);
    var maxPrefix = 0;
    
    table[0] = 0;
    var section = document.getElementById("answer");

    
    for (var i = 1; i < str.length; i++) {
        
        var p1 = document.createElement("P");
        var bo = document.createElement("B");
        bo.innerHTML = `Step ${i}: `
        p1.appendChild(bo);
        p1.innerHTML += `q = ${i+1}, k = ${maxPrefix}` ;
        section.appendChild(p1);
        var p4 = document.createElement("P");
        p4.innerHTML = `for ${i+1} to ${str.length}`;
        section.appendChild(p4);

        
        var p2 = document.createElement("P");
        
        while (maxPrefix > 0 && str.charAt(i) !== str.charAt(maxPrefix)) {
            
            p2.innerHTML = `while k > 0 && P[${maxPrefix + 1}] != P[${i+1}]`;
            section.appendChild(p2);
            maxPrefix = table[maxPrefix - 1];
        
        }
        
        if (str.charAt(maxPrefix) === str.charAt(i)) {
        var p5 = document.createElement("P");
        p5.innerHTML = `P[${maxPrefix+1}] == P[${i+1}]`;
        section.appendChild(p5);
        maxPrefix++;
        var p6 = document.createElement("P");
        p6.innerHTML = `k = k+1 = ${maxPrefix}`;
        section.appendChild(p6);
        
        }
        table[i] = maxPrefix;
        var p3 = document.createElement("P");
        p3.innerHTML = `k = pi[${i+1}] = ${maxPrefix}`;
        section.appendChild(p3);
        var p7 = document.createElement("P");
        p7.innerHTML = table + "\n";
        var br = document.createElement("BR");
        p7.appendChild(br);
        section.appendChild(p7);
        // section.appendChild(p1);
        // alert();
    }

    
    return table;
    }

    // Find all the patterns that matches in a given string `str`
    // this algorithm is based on the Knuth–Morris–Pratt algorithm. Its beauty consists in that it performs the matching in O(n)
    function kmpMatching(str, pattern) {
        
    // find the prefix table in O(n)
    var prefixes = longestPrefix(pattern);
    var matches = [];
    
    // `j` is the index in `P`
    var j = 0;
    // `i` is the index in `S`
    var i = 0;
    while (i < str.length) {
        // Case 1.  S[i] == P[j] so we move to the next index in `S` and `P`
        if (str.charAt(i) === pattern.charAt(j)) {
        i++;
        j++;
        }
        // Case 2.  `j` is equal to the length of `P`
        // that means that we reached the end of `P` and thus we found a match
        if (j === pattern.length) {
        matches.push(i-j);
        // Next we have to update `j` because we want to save some time
        // instead of updating to j = 0 , we can jump to the last character of the longest prefix well known so far.
        // j-1 means the last character of `P` because j is actually `P.length`
        // e.g.
        // S =  a b a b d e
        // P = `a b`a b
        // we will jump to `a b` and we will compare d and a in the next iteration
        // a b a b `d` e
        //     a b `a` b
        j = prefixes[j-1];
        }
        // Case 3.
        // S[i] != P[j] There's a mismatch!
        else if (str.charAt(i) !== pattern.charAt(j)) {
            console.log(i);
            // if we have found at least a character in common, do the same thing as in case 2
            if (j !== 0) {
                j = prefixes[j-1];
            } else {
                // otherwise, j = 0, and we can move to the next character S[i+1]
                i++;
            }
        }
    }
    return matches;
    }
    var res = document.getElementById("submit");
    res.onclick = function(){
        var str = document.getElementById("var1").value;
        var pat = document.getElementById("var2").value;
        kmpMatching(str, pat);
    }

    