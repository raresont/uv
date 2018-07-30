<?php

if ($_SESSION) {
    if ($_SESSION['type'] > 5) {
        echo file_get_contents("./interceptor/Succes.html") . "Hi" . $_SESSION['name']  . '</div>';
      //  unset($_SESSION['type']);
        unset($_SESSION['message']);
    } else {
        header("Location: index.php");
    }
}
include('./header/header.html');
?>
<div class="container">
    <br><table>  <tr>
            <th>Type</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Image</th>                
            <th>Latitude</th>    
            <th>Longitude</th>
            <th>Status</th>
        </tr>
        <?php
                for ($i = 0; $i < count($table); $i++) {
                    ?>
                    <tr>
                        <td> <img src="./images/buildings/<?php echo $table[$i]['type']?>.png"></img>  </td>
                        <td> <?php echo $table[$i]['Name'] ?> </td>
                        <td> <?php echo $table[$i]['description'] ?> </td>
                        <td> <img src="<?php echo $table[$i]['image'] ?>" width="100px"></img> </td>
                        <td> <?php echo $table[$i]['latitude'] ?> </td>
                        <td> <?php echo $table[$i]['longitude'] ?> </td>
                        <td> <?php echo $table[$i]['status'] ?> </td>
                        <td><form action="./index.php?Earth/change" method="POST"><input type='hidden' name='id' value='<?php echo $table[$i]['Id'] ?>'/>
                                <input width='100%' id='accept' type='submit' name='accept' value='Accept'/>
                                <input width='100%' id='close' type='submit' name='close' value='Close'/>
                            
                            </form><br></td>
                    </tr>         
                <?php
           }
            echo '</table></body>';
    ?>
</div>  

<style>
        #searchBox{
        padding-top:10px;
        width:30%;
    }
    li h4{
        color: #f2f2ff;
    }
.saveBtn{
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
	float:right;
        height: 30px;
} 
.close{
    width: 30%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
	float:right;
} 

#accept ,#close {
   // width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    text-align: center; 
    vertical-align: middle;
}
tr:nth-child(even) {
    background-color: #e4dd44;
}


    </style>